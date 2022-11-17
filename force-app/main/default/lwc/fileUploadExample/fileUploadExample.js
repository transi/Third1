import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle } from 'lightning/platformResourceLoader';
//import fileSelectorStyle from '@salesforce/resourceUrl/fileSelectorStyle';

export default class FileUploadExample extends LightningElement {
    @api recordId;
    
    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    // connectedCallback() {
    //     Promise.all([
    //         loadStyle(this, fileSelectorStyle)
    //     ]);
    // }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files.length;
        const evt = new ShowToastEvent({
            title: 'SUCCESS',
            message: uploadedFiles + ' File(s) uploaded  successfully',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}