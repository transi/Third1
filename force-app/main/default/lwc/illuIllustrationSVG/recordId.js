// https://www.lightningdesignsystem.com/components/illustration/#No-Task

import { LightningElement, api } from 'lwc';
// import NoRecords from '@salesforce/resourceUrl/NoRecordsSVG';

export default class NoRecordsView extends LightningElement {

    @api text = 'There are no records';
    // noRecordsView;

    // connectedCallback() {
    //     this.noRecordsView = NoRecords + '/no-records.svg';
    // }
}