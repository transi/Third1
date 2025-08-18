import { LightningElement,track } from 'lwc';
const options = [
    {'value':'youtubeVideoExplorer','label':'Videos'},
    {'value':'imageExplorer','label':'Images'},
];
export default class DynamicInstantiate extends LightningElement {
    options=options;
    componentConstructor;
     // handle the selected value
     handleSelected(event) {
        this.loadComponent(event.target.value);
     }
     async loadComponent(lwcCmp) {
        const ctor = await import('c/'+lwcCmp);
        this.componentConstructor = ctor.default;
    }
}