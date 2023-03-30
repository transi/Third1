import { LightningElement } from 'lwc';

export default class HelloWorldJestTest extends LightningElement {
   message = 'JEST Test!';
  
  handleChange(event) {
    this.message = event.target.value;
  }
}