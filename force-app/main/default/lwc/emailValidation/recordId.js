import { LightningElement, track } from 'lwc';

export default class DynamicValidationExample extends LightningElement {
  @track email = '';
  @track confirmEmail = '';
  @track emailError = '';
  @track confirmEmailError = '';

  handleEmailChange(event) {
    this.email = event.target.value;
    this.validateEmail();
    this.validateConfirmEmail();
  }

  handleConfirmEmailChange(event) {
    this.confirmEmail = event.target.value;
    this.validateConfirmEmail();
  }

  validateEmail() {
    if (!this.email) {
      this.emailError = 'Email is required.';
    } else if (!this.email.match('.+@.+\..+')) {
      this.emailError = 'Please enter a valid email address.';
    } else {
      this.emailError = '';
    }
  }

  validateConfirmEmail() {
    if (!this.confirmEmail) {
      this.confirmEmailError = 'Confirm Email is required.';
    } else if (this.confirmEmail !== this.email) {
      this.confirmEmailError = 'Emails do not match.';
    } else {
      this.confirmEmailError = '';
    }
  }

  handleSubmit() {
    if (!this.emailError && !this.confirmEmailError) {
      // Form is valid, perform submission logic
      // ...
    }
  }
}