import { LightningElement, wire, track } from 'lwc';
import retrieveLocations from '@salesforce/apex/accountControllerService.fetchAccounts';
 
const columns = [
    { label: 'Name', fieldName: 'Name' },
];
 
export default class TypeAheadLWC extends LightningElement {
    data;
    error;
    columns = columns;
    searchString;
    initialRecords;
    listOfSelectedRecords = [];

    @wire(retrieveLocations)
    wiredAccount({ error, data }) {
        if (data) {
            console.log(data);
            this.data = data;
            this.initialRecords = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
 
    handleSearch(event) 
    {
        const searchKey = event.target.value.toLowerCase();

        if (searchKey) 
        {
            this.data = this.initialRecords;
 
            if (this.data) 
            {
                let searchRecords = [];
 
                for (let record of this.data) 
                {
                    let valuesArray = Object.values(record);
 
                    for (let val of valuesArray) 
                    {
                        console.log('val is ' + val);
                        let strVal = String(val);
 
                        if (strVal && strVal.toLowerCase().includes(searchKey)) 
                        {
                            searchRecords.push(record);
                            break;
                        }
                    }
                }
                console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
                this.data = searchRecords;
            }
        } 
        else 
        {
            this.data = this.initialRecords;
        }
    }

    handleRowAction(event) 
    {
        //alert('handleRowAction');
        var selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log('@@@ 1 HEY ' +JSON.stringify(selectedRecords));
        
        if (selectedRecords) 
        {
            for(var i=0; i<selectedRecords.length; i++)
            {
                if (!this.listOfSelectedRecords.includes(selectedRecords[i].Id)) 
                {
                    this.listOfSelectedRecords.push(selectedRecords[i].Id);
                }
            }
        }
        console.log('@@@ 2 ' + JSON.stringify(this.listOfSelectedRecords));
    }
}