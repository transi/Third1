import { LightningElement, api } from "lwc";

export default class childFan extends LightningElement {
  @api percentage;

  get style() {
    return `animation-duration: ${this.percentage}s`;
  }
}
