import { LightningElement, api } from 'lwc';
import { RefreshEvent } from 'lightning/refresh';
export default class FileUploader extends LightningElement {
    @api recordId;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // refresh the standard related list
        this.dispatchEvent(new RefreshEvent());
    }
}