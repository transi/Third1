import { LightningElement } from 'lwc';
const sampleArray = [{Id :'1'},{Id :'2'},{Id :'3'}]

export default class TestArray extends LightningElement {


  sampleArray = sampleArray;

  renderedCallback(){
    console.log('renderedCallback');
    this.sampleArray.forEach((item) => {
        let selectorId = 'article[data-id="' + item.Id + '"]'; 
    
        console.log('selector ->' + selectorId); //returns proper string
    
        //below line throws run time error, cannot read properties of undefined
        let element = this.template.querySelector('article[data-id="' + item.Id + '"]'); 
        console.log(element);
        element.classList.add('test-color'); //add different classes as per business logic, keeping it concise here
    })
  }
}