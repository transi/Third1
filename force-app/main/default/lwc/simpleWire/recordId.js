import { LightningElement, wire } from 'lwc';
import getLeadsList from '@salesforce/apex/LeadsService.getLeads';
  
export default class DisplayLeads extends LightningElement {
 
 
    @wire(getLeadsList)
    leads;
}