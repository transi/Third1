import {LightningElement} from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import christmatsSrylez from '@salesforce/resourceUrl/Christmas_Stylesheets';

export default class ChristmasMagic extends LightningElement {
    connectedCallback() {
        loadStyle(this, christmatsSrylez);
    }
}