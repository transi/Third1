
import { LightningElement, api, wire ,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS=['Opportunity.Id','Opportunity.StageName'];
export default class FutureOpportunity extends LightningElement {
    @api recordId;
    opportunity;
    lastModifiedDate;
    StageName;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (error) {
           console.log('error occured'+error);
        } else if (data) {
            this.opportunity = data;
            let sname = this.opportunity.StageName;
            if(!this.StageName) {
                this.StageName = this.opportunity.StageName;
            }
            if (sname !== this.StageName) {
                this.showNotification();
                this.showModalBox();
            }
        }
    }
    showNotification() {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Opportunity Updated',
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }
    @track isShowModal = false;
    showModalBox() {
        this.isShowModal = true;
    }
    hideModalBox() {
        this.isShowModal = false;
    }
}