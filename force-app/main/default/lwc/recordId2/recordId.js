import { LightningElement, api } from 'lwc';

export default class RecordId extends LightningElement {

    @api recordId;

    @api objectApiName;

    constructor(){
        super();
        console.log('Rec. Id:'+this.recordId);
        console.log('Obj. Api Name:'+this.objectApiName);
    }

}

