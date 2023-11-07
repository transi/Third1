import { LightningElement, track } from 'lwc';

export default class PasswordValidationExample extends LightningElement {
  @track password = '';
  @track passwordError = '';

  handlePasswordChange(event) {
    this.password = event.target.value;
    this.validatePassword();
  }

  validatePassword() {
    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (this.password.length < 8) {
      this.passwordError = 'Password should be at least 8 characters long.';
    } else if (!/[A-Z]/.test(this.password)) {
      this.passwordError = 'Password should contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(this.password)) {
      this.passwordError = 'Password should contain at least one numeric digit.';
    } else {
      this.passwordError = '';
    }
  }

  handleSubmit() {
    if (!this.passwordError) {
      // Form is valid, perform submission logic
      // ...
    }
  }
}