import { LightningElement, track, api, wire } from 'lwc';
import getDeletedLeads from '@salesforce/apex/RecordDataController.getDeletedLeads';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';

const FIELDS = [ 
                 NAME_FIELD,
                 EMAIL_FIELD
               ];

export default class DisplayData extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    leads;
    @track leadName = '';
    @track leadEmail = '';
    
    renderedCallback() {
        this.getLeads();
    }

    @track columns = [
        { label: 'Id', fieldName: 'Id', wrapText: false, hideDefaultActions: true },
        { label: 'Name', fieldName: 'Name', wrapText: false, hideDefaultActions: true },
        { label: 'Email', fieldName: 'Email', wrapText: false, hideDefaultActions: true }
    ];

    @track deletedLeadsList;
    getLeads() {
        getDeletedLeads({
        leadName: getFieldValue(this.leads.data, NAME_FIELD),
        leadEmail: getFieldValue(this.leads.data, EMAIL_FIELD)
        }).then((data) => {
                if (data) { this.deletedLeadsList = data;
                            console.log('data = ' + data);
                }
            });
        }
}