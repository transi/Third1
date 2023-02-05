import { LightningElement,wire,api } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
const columns = [
    { label: 'Id', fieldName: 'Id'},
    { label: 'Name', fieldName: 'Name', type: 'text', editable: true },
    { label: 'AccountSource', fieldName: 'AccountSource', type: 'text', editable: true },
    { label: 'AnnualRevenue', fieldName: 'AnnualRevenue', type: 'currency', editable: true },
];
export default class Demo extends LightningElement {
    columns = columns;
     @api draftValues = [];
    @api accData = [];
    error;
    

    @wire(getAccounts)
    wiredBoats({ error, data }) {
        console.log('data==> ' + data);
        console.log('error==> ' + JSON.stringify(error));
        if (data) {
            this.accData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accData = undefined;
        }
    }

    refresh() { 
        refreshApex(this.accData) /* Am I using refresh Apex correctly here */
    }

    handleSave(event) {
        const recordInputs = event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
        console.log('before promoises ==>' + JSON.stringify(recordInputs));
        const promises = recordInputs.map(recordInput =>
            updateRecord(recordInput)
        );
        Promise.all(promises)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Saved!',
                        variant: 'success'
                    })
                );
                this.refresh();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            })
            .finally(() => { this.draftValues = []; });
    }

}