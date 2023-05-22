import { LightningElement ,track} from 'lwc';
export default class CustomEventChild extends LightningElement{
 @track test = 'Value received from child';
  handleClick(event){
   const storeEvent = new CustomEvent('myevent', 
   { detail: this.test}
   );
   this.dispatchEvent(storeEvent);
  }
}
