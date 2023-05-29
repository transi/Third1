import { LightningElement,wire } from 'lwc';
import getAccountWithContact from '@salesforce/apex/AccountWrapperDemo.getAccountWithContact';
export default class LWCWrapperDemo extends LightningElement {
    @wire(getAccountWithContact) wrapperList;
}