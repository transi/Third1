import {
    LightningElement,
    track,
    api,
    wire
    } from 'lwc';
    import { ShowToastEvent } from 'lightning/platformShowToastEvent';
    
    export default class TreeGrid extends LightningElement {
    
    showNotification() {
             const event = new ShowToastEvent({
                 title: 'Get Help',
                 message: 'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
                  variant: 'warning',
                  mode: 'pester'
             });
             this.dispatchEvent(event);
         }
    }