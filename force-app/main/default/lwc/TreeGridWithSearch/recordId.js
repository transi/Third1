import { LightningElement } from 'lwc';
//import fetchAccountAndRelatedContacts from '@salesforce/apex/accountController.fetchAccountAndRelatedContacts';
const DELAY = 350;
export default class TreeGridWithSearch extends LightningElement {
    gridData;

    gridColumns = [
        {
            type: 'text',
            fieldName: 'Name',
            label: 'Name'
        },
        {
            type: 'text',
            fieldName: 'Phone',
            label: 'Phone'
        },
        {
            type: 'text',
            fieldName: 'AccountNumber',
            label: 'Account Number'
        },
        {
            type: 'text',
            fieldName: 'FirstName',
            label: 'First Name'
        },
        {
            type: 'text',
            fieldName: 'LastName',
            label: 'Last Name'

        }
    ];

    handleKeyChange(event) {
        // Debouncing this method: Do not actually invoke the Apex call as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            fetchAccountAndRelatedContacts({ searchKey: searchKey }).then((result) => {
                let data = JSON.parse(JSON.stringify(result));
                for (let i = 0; i < data.length; i++) {
                    data[i]._children = data[i]['Contacts'];
                    delete data[i]['Contacts'];
                }
                this.gridData = data;
            }).catch((error) => {
                console.log(error);
                this.gridData = undefined;
            });
        }, DELAY);
    }
}