import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/AccountController.getAccounts';
export default class ContactsTable extends LightningElement {
   @track columns = [
      { label: 'Name', fieldName:'recordLink', type: 'url', 
      typeAttributes: {label: {fieldName: "ContactName"}, tooltip: "Name", linkify: true} },
      { label: 'Id', fieldName: 'Id'},
      { label: 'Name', fieldName: 'Name'}
   ];
   @track contacts;
   @wire(getContacts)
   wiredContacts(value) {
      const {error, data} = value;
      if (data) {
         let contactData = JSON.parse(JSON.stringify(data));  
         contactData.forEach(record => {
            record.recordLink = "/" + record.Id;  
            record.ContactName = record.Name;
         });  
         this.contacts = contactData;
      } else if (error) {
         this.error = error;
      }
   }
}