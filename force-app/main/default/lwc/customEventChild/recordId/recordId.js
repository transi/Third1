import { LightningElement ,track} from 'lwc';
export default class CustomEventParent extends LightningElement{
  @track response = '';
//here we handled the event
  handleResponse(event){
   this.response = event.detail;
   console.log('Event =>>'+JSON.stringify(event));
  }
}