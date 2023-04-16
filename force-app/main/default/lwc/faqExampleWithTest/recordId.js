
import { LightningElement, wire } from "lwc";
import getFAQs from "@salesforce/apex/FAQController.getFAQs";

export default class FAQList extends LightningElement {
  @wire(getFAQs) faqs;
  activeSections = [];
}