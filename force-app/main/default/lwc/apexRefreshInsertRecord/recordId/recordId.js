import { LightningElement, wire } from 'lwc';
import {
    getRecordCreateDefaults,
    generateRecordInputForCreate,
    createRecord
} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { RefreshEvent } from 'lightning/refresh';

export default class WireRefreshButton extends LightningElement {
    contRecordInput;
    contactId;

    @wire(getRecordCreateDefaults, { objectApiName: CONTACT_OBJECT })
    contactCreateDefaults;

    recordInputForCreate() {
        if (!this.contactCreateDefaults.data) {
            return undefined;
        }

        const contactObjectInfo =
            this.contactCreateDefaults.data.objectInfos[
                CONTACT_OBJECT.objectApiName
            ];
        const recordDefaults = this.contactCreateDefaults.data.record;
        const recordInput = generateRecordInputForCreate(
            recordDefaults,
            contactObjectInfo
        );
        return recordInput;
    }

    btnClick() {
        this.contRecordInput = this.recordInputForCreate();

        this.contRecordInput.fields.FirstName = 'Fooey';
        this.contRecordInput.fields.LastName = 'Test';
        this.contRecordInput.fields.AccountId = '0017d00001IwY00AAF';
        this.contRecordInput.fields.Email = 'fooey@barey.com';
        this.contRecordInput.fields.LeadSource = 'LeadSource';

        createRecord(this.contRecordInput)
            .then((contact) => {
                this.dispatchEvent(new RefreshEvent());
                this.contactId = contact.id;

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created',
                        variant: 'success'
                    })
                );
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}
