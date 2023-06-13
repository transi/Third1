import { LightningElement, api } from 'lwc';

export default class CircularProgressIndicator extends LightningElement {
    @api percent;
    @api size;
    fillpercent;
    isLong = 1;
    arcX = 0;
    arcY = 0;
    svgURL = "";

    connectedCallback() {
        this.fillpercent = eval(this.percent);
        this.isLong = (this.fillpercent > 0.5) ? 1 : 0;
        this.arcX = Math.cos(2 * Math.PI * this.fillpercent);
        this.arcY = Math.sin(2 * Math.PI * this.fillpercent);
        this.svgURL = `M 1 0 A 1 1 0 ${this.isLong} 1 ${this.arcX} ${this.arcY} L 0 0`;
    }
}