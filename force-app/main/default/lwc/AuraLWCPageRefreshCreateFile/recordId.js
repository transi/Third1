import { LightningElement, api } from 'lwc';
import linkExistingFile from '@salesforce/apex/fileCreationController.linkExistingFile';
export default class FileCreationUsingApex extends LightningElement {
    @api recordId;
    handleClick() {
        linkExistingFile({ parentId: this.recordId }).then(result => {
            // Creates the event with the record ID data.
            const selectedEvent = new CustomEvent('linked', { detail: this.recordId });
            // Dispatches the event.
            this.dispatchEvent(selectedEvent);
        }).catch(error => {
            console.log(JSON.stringify(error));
        });
    }
}