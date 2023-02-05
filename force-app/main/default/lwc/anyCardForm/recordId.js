import { LightningElement } from 'lwc';

export default class CreateAccount extends LightningElement {
    handleSuccess(event) {
        // Account record has been created
        // You can get the recordId from the event.detail.id
        const recordId = event.detail.id;
        console.log('New Account created with Id: ' + recordId);
    }
}