import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import displayRelatedOpp_Account from '@salesforce/apex/relatedOpp_Account.displayRelatedOpp_Account';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';

const COLS = [
    {
        label: 'Opportunity Name',
        fieldName: NAME_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Stage Name',
        fieldName: STAGENAME_FIELD.fieldApiName,
        editable: true,
    },
    { 
        label: 'Amount', 
        fieldName: AMOUNT_FIELD.fieldApiName, 
        editable: true 
    }
];

export default class RelatedRec_RecordForm extends LightningElement {

    @api recordId;
    @api objectApiName = 'Opportunity';
    @api opps = [];
    cols = COLS;

    @wire(displayRelatedOpp_Account, { accId: '$recordId' })
    wiredOpps ({error, data}) {
        if (error) {
            this.opps = undefined;
            const evt = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(evt);
        } else if (data) {
            this.opps = data;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

}