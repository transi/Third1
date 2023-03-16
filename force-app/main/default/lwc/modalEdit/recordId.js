import {
    LightningElement, track, api, wire
} from 'lwc';
import {
    NavigationMixin
} from "lightning/navigation";
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import {
    createRecord
} from 'lightning/uiRecordApi';

export default class Modalspinner extends NavigationMixin(LightningElement) {

    @track spinner;
    @api recordId;
    @track openmodel = true;
    @track accId = '0012v00002InPVmAAN';
    @track cntId;


    handleClick() {

        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.template.querySelector('.firstName').value;
        fields[LASTNAME_FIELD.fieldApiName] = this.template.querySelector('.lastName').value;
        fields[PHONE_FIELD.fieldApiName] = this.template.querySelector('.phone').value;
        fields[EMAIL_FIELD.fieldApiName] = this.template.querySelector('.email').value;
        fields[ACCOUNTID_FIELD.fieldApiName] = this.recordId;
        const recordInput = {
            apiName: CONTACT_OBJECT.objectApiName,
            fields
        };
        createRecord(recordInput)
            .then(result => {
                this.message = result;
                this.cntId = JSON.parse(JSON.stringify(this.message)).id;
                this.redirect();
            })

    }
    redirect() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.cntId,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });
    }
}