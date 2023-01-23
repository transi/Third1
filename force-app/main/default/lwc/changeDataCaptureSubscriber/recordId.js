import { LightningElement, api } from 'lwc';
import { subscribe, unsubscribe, onError } from 'lightning/empApi';
import AssignTask from '@salesforce/apex/changeDataCaptureController.AssignTask';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ChangeDataCaptureSubscriber extends LightningElement {
    channelName = '/data/OpportunityChangeEvent';
    subscription = {};
    @api recordId;

    subscribed;

    // Tracks changes to channelName text field
    handleChannelName(event) {
        this.channelName = event.target.value;
    }

    renderedCallback() {
        if (!this.subscribed) {
            this.handleSubscribe();
            this.subscribed = true;
        }
    }

    // Initializes the component
    connectedCallback() {
        // Register error listener
        this.registerErrorListener();

    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = (response) => {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
            this.handleMessage(response);
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then(response => {
            // Response contains the subscription information on subscribe call
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;
        });
    }

    // Handles unsubscribe button click
    handleUnsubscribe() {
        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

    handleMessage(response) {
        console.log('handleMessage', 'handleMessage');
        if (response) {
            if (response.hasOwnProperty('data')) {
                let responsePayload = response.data.payload;
                if (responsePayload.hasOwnProperty('StageName') && responsePayload.hasOwnProperty('ChangeEventHeader')) {
                    if (responsePayload.ChangeEventHeader.hasOwnProperty('recordIds') && responsePayload.StageName == 'Closed Won') {
                        let currentRecordId = responsePayload.ChangeEventHeader.recordIds.find(element => element == this.recordId);
                        console.log('currentRecordId', currentRecordId);
                        if (currentRecordId) {
                            AssignTask({
                                recordid: this.recordId
                            }).then(result => {
                                const event = new ShowToastEvent({
                                    title: 'Task Assigned',
                                    message: 'A task has been assigned to you, please complete them.',
                                    variant: 'success'
                                });
                                this.dispatchEvent(event);
                            }).catch(error => {
                                console.log(error);
                            })
                        }
                    }

                }
            }
        }
    }
}