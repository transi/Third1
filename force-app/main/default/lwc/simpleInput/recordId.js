import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';

export default class InputExample extends LightningElement() {

    emailvalue ="username@example.com";
    mobilevalue= "000-000-0000";

    handleEmailChange(event){
        this.emailvalue = event.target.value;
    } 

    handleMobileChange(event){
        this.mobilevalue = event.target.value;
    } 

    handleNext() {

        alert('email '+ this.emailvalue);
        alert('Mobile '+ this.mobilevalue);
        
    }
    handleCancel(){

            this.emailvalue = "username@example.com";
            this.mobilevalue = "000-000-0000";
    }
}