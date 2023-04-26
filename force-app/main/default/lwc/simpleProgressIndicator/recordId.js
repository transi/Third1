import { LightningElement, track, wire } from 'lwc';

export default class ProgressIndicatorPathTypeWithIteration extends LightningElement {
    
    currentStep='step-3';

    @track testVar=false;
    steps = [
        { label: 'Contacted', value: 'step-1' },
        { label: 'Open', value: 'step-2' },
        { label: 'Unqualified', value: 'step-3' },
        { label: 'Nurturing', value: 'step-4' },
        { label: 'Closed', value: 'step-5' },
    ];
    
    handleOnClick(event){
        this.currentStep = event.target.dataset.id;
        this.testVar = !this.testVar;  //TROUBLE MAKER STATMENT
    }
}