import { LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { refreshApex } from '@salesforce/apex';
import {
    registerRefreshHandler,
    unregisterRefreshHandler
} from 'lightning/refresh';

export default class WireRefreshList extends LightningElement {
    error;
    records = [];
    contactData;
    refreshHandlerID;

    connectedCallback() {
        this.refreshHandlerID = registerRefreshHandler(
            this,
            this.refreshHandler
        );
    }

    disconnectedCallback() {
        unregisterRefreshHandler(this.refreshHandlerID);
    }

    refreshHandler() {
        refreshApex(this.contactData);
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '0017d00001IwY00AAF',
        relatedListId: 'Contacts',
        fields: ['Contact.Name', 'Contact.Id'],
        sortBy: ['Contact.Name']
    })
    listInfo(result) {
        this.contactData = result;
        if (result.data) {
            this.records = result.data.records;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.records = undefined;
        }
    }

    get hasNoRecords() {
        return this.records?.length === 0;
    }
}
