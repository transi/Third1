import { LightningElement, api } from 'lwc';
export default class DualRecordForm extends LightningElement {
    @api fieldList = ["Name", "ParentId", "AccountNumber", "Phone"]; //harcoded the values assuming objectApiName is Account for demo purpose
    showEditField;
    @api recordId;
    @api objectApiName;
    handleSuccess(event) {
        this.showEditField = false;
    }
    handleEdit() {
        this.showEditField = !this.showEditField;
    }
}