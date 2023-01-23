import { LightningElement, track } from 'lwc';
import dataTable from '@salesforce/apex/accountControllerService.fetchAccounts';
export default class ChangeDataCaptureSubscriber extends LightningElement {
    quoteList;

    @track columns = [
        
        { label: 'Id', fieldName: 'Id' },
        { label: 'Account Name', fieldName: 'Name' }
        
    ];

    // Initializes the component
    connectedCallback() {
        dataTable()
            .then(results => {
                console.log('results', results);
                this.quoteList = [];
                results.forEach(element => {
                    this.quoteList.push({
                        Id: element.Id,
                        Name: element.Name
                        // element.Name
                    });
                });
                // to make sure it does not have any reference and ui reflects properly
                this.quoteList = JSON.parse(JSON.stringify(this.quoteList));
                console.log('this.quoteList', this.quoteList);
            }).catch(error => {
                console.log('error', error);
            });
    }
}