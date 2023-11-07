import { LightningElement ,track} from 'lwc';

export default class ContactForm extends LightningElement {
    
      // Define a function to handle the form submission
      handleSubmit(event) {
        // Prevent the default behavior of the form
        event.preventDefault();
    
        // Get the fields from the event detail
        const fields = event.detail.fields;
    
        // Get the form element from the template
        const form = this.template.querySelector("lightning-record-edit-form");
    
        // Loop through the fields and check if any of them is empty
        for (const [key, value] of Object.entries(fields)) {
          if (!value) {
            // Get the input element for the empty field
            const input = this.template.querySelector(
              `lightning-input-field[field-name=${key}]`
            );
    
            // Scroll to the input element and focus on it
            input.scrollIntoView();
            input.focus();
    
            // Return from the function
            return;
          }
        }
    
        // Submit the form
        form.submit(fields);
      }
    
      // Define a function to handle the form error
      handleError(event) {
        // Get the error message from the event detail
        const message = event.detail.message;
    
        // Show an alert with the error message
       
      }
    }