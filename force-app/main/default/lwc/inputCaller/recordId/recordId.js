import { LightningElement } from 'lwc';

export default class InputCaller extends LightningElement {
    fieldValueFromInput; //property to hold the entered field value
    
    //Assigning the payload to private property
    handleChange(event) {
        this.fieldValueFromInput = event.detail.value;
    }
}