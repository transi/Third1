import { LightningElement, wire, api } from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import CONNECTOR_CHANNEL from '@salesforce/messageChannel/connector__c';
export default class ConsoleApiWithLwc extends LightningElement {
    @wire(MessageContext)
    messageContext;

    @api recordId;

    // Respond to UI event by publishing message
    publishMessageFromLWC(event) {
        const payload = { recordId: this.recordId };
        publish(this.messageContext, CONNECTOR_CHANNEL, payload);
    }
}