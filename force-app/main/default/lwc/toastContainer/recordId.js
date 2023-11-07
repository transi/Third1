// c/myToastComponent.js
import { LightningElement } from 'lwc';
import ToastContainer from 'lightning/toastContainer';
// import Toast from 'lightning/toast';
import LightningAlert from 'lightning/alert';
export default class MyToastComponent extends LightningElement {
    toastContainer;
    connectedCallback() {
        this.toastContainer = ToastContainer.instance();
        
    }
    showToast1() {
        this.toastContainer.maxToasts = 5;
        this.toastContainer.toastPosition = 'top-left';
        Toast.show({
            label: 'Learn how to {0}',
            labelLinks: [{
                'url': 'https://sfdclesson.com/2023/08/31/display-toast-notification-with-an-icon-label-message-and-links/',
                'label': 'Create Toast Notifications with Icons, Labels, and Links'
            }],
            message: 'Elevate your Salesforce skills with {0}',
            messageLinks: [{
                url: 'https://sfdclesson.com/',
                label: 'SFDCLesson'
            }],
            mode: 'sticky',
            variant: 'success',
            onclose: () => {
                LightningAlert.open({
                    message: 'this is the alert message',
                    theme: 'inverse', // a red theme intended for error states
                    label: 'Header!', // this is the header text
                });
                //Alert has been closed
            }
        }, this);
    }
    showToast2() {
        //Sets the maximum number of toast components shown at a given time.
        this.toastContainer.maxToasts = 5;
        //Controls the position of toast components inside the toast container. Supported values are 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', and 'bottom-right'.
        this.toastContainer.toastPosition = 'top-center';
        Toast.show({
            label: 'Learn how to {0}',
            labelLinks: [{
                'url': 'https://sfdclesson.com/2023/08/08/create-an-analog-clock-lightning-web-component-in-your-salesforce-org//',
                'label': 'Create an Analog Clock Lightning Web Component in Your Salesforce Org'
            }],
            message: 'This message has a {0} placeholder link that gets replaced by from messageLinks',
            messageLinks: [{
                url: 'https://sfdclesson.com/',
                label: 'SFDCLesson'
            }],
            mode: 'sticky',
            variant: 'warning',
            onclose: () => {
                // Do something after the toast is closed
            }
        }, this);
    }
    showToast3() {
        this.toastContainer.maxToasts = 5;
        this.toastContainer.toastPosition = 'top-right';
        Toast.show({
            label: 'Learn how to create {0}',
            labelLinks: [{
                'url': 'https://sfdclesson.com/2023/07/11/custom-multi-select-picklist-in-lwc-with-drag-and-drop-feature/',
                'label': 'Custom Multi-Select Picklist in LWC with Drag-and-Drop Feature'
            }],
            message: 'This message has a {0} placeholder link that gets replaced by from messageLinks',
            messageLinks: [{
                url: 'https://sfdclesson.com/',
                label: 'SFDCLesson'
            }],
            mode: 'sticky',
            variant: 'error',
            onclose: () => {
                // Do something after the toast is closed
            }
        }, this);
    }
}