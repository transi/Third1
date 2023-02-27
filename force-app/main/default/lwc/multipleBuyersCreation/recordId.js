import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {FlowNavigationNextEvent, FlowAttributeChangeEvent} from 
"lightning/flowSupport";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class inputRows extends NavigationMixin(LightningElement) {

@api opportunityId;
@api buyerId;
@api buyers = [];
@api availableActions = [];
@api itemList = [];



keyIndex = 0;


@track itemList = [
    {
        row: 0,
    }
];

addRow(event) {
    ++this.keyIndex;
    let randomId = event.detail.id;
    var newItem = [{ row: this.keyIndex}];
    this.itemList = this.itemList.concat(newItem);
}

removeRow(event) {
    if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
            return parseInt(element.id) !== parseInt(event.target.accessKey);
        });
    }
}


handleSubmit() {
    var isVal = true;
    this.template.querySelectorAll('lightning-input-field').forEach(element => {
        isVal = isVal && element.reportValidity();
        console.log("this.itemList:" + JSON.stringify(this.itemList));
    });
    if (isVal) {
        this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
            element.submit();
        });
    } 
    this.showToast();

}

showToast() {
    const event = new ShowToastEvent({
        title: 'Buyers',
        message: 'Buyers created successfully',
        variant: 'success'
    });
    this.dispatchEvent(event);
}

handleSuccess(event) {
    this.buyerId = event.detail.id;
    this.buyers.push(this.buyerId);

   console.log("buyers:" + this.buyers);

  this.dispatchEvent(new CustomEvent('buyerschange', {
    detail: { itemList: this.itemList}
})); 

}
}