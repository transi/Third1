import { LightningElement, api } from 'lwc';
import getSingleContact from '@salesforce/apex/ContactController.getSingleContact';
export default class ChildAsync extends LightningElement {
    @api handleParentCall() {
        return getSingleContact()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}