import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddInventoryItems extends NavigationMixin(LightningElement) {

keyIndex = 0;
count;
@api recordId;
@track itemList = [
    {
        id: 0
    }
];

addRow() {
    ++this.keyIndex;
    var newItem = [{ id: this.keyIndex }];
    //this.itemList = this.itemList.concat(newItem);
    this.itemList.push({id: this.keyIndex});
}

removeRow(event) {
    if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
            return parseInt(element.id) !== parseInt(event.target.accessKey);
        });
    }
}

resetForm() {
    this.itemList = [];
    this.addRow();
}

handleReset(){
    this.resetForm();
}

handleSubmit() {
    var isVal = true;
    this.count = 0;
    this.template.querySelectorAll('lightning-input-field').forEach(element => {
        isVal = isVal && element.reportValidity();
    });
    if (isVal) {
        this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
            element.submit();
            this.count++;
          //  window.alert('Submitting item ' + this.count + ' of ' + this.itemList.length);
            if(this.count === this.itemList.length)
            {
               // window.alert ('About to reset form');
                this.count = 0;
                this.resetForm();
                eval("$A.get('e.force:refreshView').fire();");
            }
        });
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Items successfully created',
                variant: 'success',
            }),
        );
        
    } else {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error creating records',
                message: 'Please enter all the required fields',
                variant: 'error',
            }),
        );
    }
    }
}