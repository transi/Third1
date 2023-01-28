import { LightningElement } from 'lwc';

export default class ComponentTest extends LightningElement {
    notify()
    {
        //Use Generic Component to show alert
        this.template.querySelector('c-common-notification').notify('alert', 'This is notification','header','Notification','info');
        
        //Ask question using Prompt
        this.template.querySelector('c-common-notification').notify('prompt', 'What is your Email?','header','Notification','info');
        
        //Ask Confirmation using confirm
        this.template.querySelector('c-common-notification').notify('confirm', 'Are you satisfied with our services?','header','Notification','info');
   }
}