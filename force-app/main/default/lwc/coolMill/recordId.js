import { LightningElement } from "lwc";

export default class parentToChild extends LightningElement {
  percentage = 1;

  handlePercentageChange(event) {
    const percentage = event.target.value;

    this.percentage = percentage <= 100 ? percentage : 100;
  }
}
