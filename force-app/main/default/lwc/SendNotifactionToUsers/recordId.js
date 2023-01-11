import { LightningElement, api, track } from 'lwc';
import notifyUsers from '@salesforce/apex/CustomNotificationFromApex.notifyUsers';
import getNotificationList from '@salesforce/apex/CustomNotificationFromApex.getNotificationList';
export default class SendCustomNotification extends LightningElement {
    @api recordId;
    @track notificationOptions = [];
    showNotificationTypePicklist = false; 

    //fired on load of the component
    connectedCallback(){
        this.notificationJson.targetId = this.recordId;
        //get all the notification type
        getNotificationList()
        .then((result) => {
            result.forEach(element => {
                this.notificationOptions.push({label: element.CustomNotifTypeName, value: element.Id});
            });
            this.showNotificationTypePicklist = true;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //handler for button click
    handleClick(){
        //send the custom notification
        notifyUsers({ 
            wrapp : this.notificationJson
        })
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //property to hold the input parameter values
    @track notificationJson = {
        title: null,
        body: null,
        customNotificationType: null,
        targetId : null
    };

    //hanlder for title input
    handleTitle(event){
        this.notificationJson.title = event.detail.value;
    }

    //hanlder for body input
    handleBody(event){
        this.notificationJson.body = event.detail.value;
    }

    //hanlder for notification type picklist
    handleNotificationTypeChange(event){
        this.notificationJson.customNotificationType = event.detail.value;
    }
}