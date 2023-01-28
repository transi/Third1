import { LightningElement,api } from 'lwc';
export default class TestComp extends LightningElement {
    @api recordId;
    
    renderedCallback() {
        var dv = document.createElement('div');
        dv.innerHTML = 'myDiv';
        this.template.querySelector('div').appendChild(dv);/*'<div>myDiv</div>'*/
        console.log('print this!!');
        console.log(this.recordId); 
    }    
}