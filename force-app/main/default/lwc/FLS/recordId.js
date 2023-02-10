import { LightningElement, wire, api, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

// Importing required modules from the LWC library
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateNewContact extends LightningElement {

    // Defining the object API name
    objectApiName = 'Contact';

    // Defining the fields to be displayed
    fields = ['FirstName', 'LastName', 'Email', 'Phone'];

    // Declaring a trackable variable to store the contact fields data
    @track contactFLS = {};

    // Function to check the visibility of the fields
    checkFieldVisibility(data, fieldName) {
        // Checking if the field exists in the data
        if (data.fields[fieldName] != undefined) {
            // If exists, return true
            return true;
        } else {
            // If not exists, return false
            return false;
        }
    }

    // Using the wire method to fetch the object information
    @wire(getObjectInfo, { objectApiName: '$objectApiName'})
    objectInfo({error, data}) {
        // Handling the error
        if (error) {
            // Showing the toast message
            const message = 'Error fetching object information: ' + error.message;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: message,
                variant: 'error'
            }));
        } 
        // Checking if data is present
        else if (data) {
            // Iterating through the fields defined
            this.fields.forEach(field => {
                // Checking the visibility of the field
                if (this.checkFieldVisibility(data, field)) {
                    // If visible, setting the visibility to true and checking if the field is updateable or not
                    this.contactFLS[`${field}Visible`] = true;
                    this.contactFLS[`${field}Disabled`] = !data.fields[field].updateable;
                } else {
                    // If not visible, setting the visibility to false
                    this.contactFLS[`${field}Visible`] = false;
                }
            });
        }
    }

}