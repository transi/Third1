import { LightningElement } from 'lwc';
import saveJsonAsFile from '@salesforce/apex/JsonController.saveJsonAsFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class JsonInLwc extends LightningElement {
    //property with default json object as value
    blogdetail = {
        name: 'Salesforce Diaries',
        author: 'Sanket',
        url: 'https://salesforcediaries.com/',
        focus: 'LWC',
        startedIn: '2020',
        numberOfPost: '100',
        motive: 'help developers'
    };

    //format the json object to show it on ui
    get jsonString() {
        return JSON.stringify(this.blogdetail, null, 2);
    }

    //save the file
    handleSave() {
        saveJsonAsFile({ obj: this.blogdetail })
            .then((result) => {
                const event = new ShowToastEvent({
                    title: 'File Uploaded',
                    message: 'file has been successfully uploaded, File Id is: ' + result,
                    variant: 'success'
                });
                this.dispatchEvent(event);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}