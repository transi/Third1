import { LightningElement, wire, track, api } from 'lwc';
import getOppRecords from '@salesforce/apex/oppRelatedAcc.getOppRecords'
import updateOppRecords from '@salesforce/apex/oppRelatedAcc.updateOppRecords'
import { refreshApex } from '@salesforce/apex';


import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';

const COLS = [
    {
        label: 'Opp Name',
        fieldName: NAME_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Stage Name',
        fieldName: STAGENAME_FIELD.fieldApiName,
        editable: false
    },
    
    {
        label: 'Amount',
        fieldName: AMOUNT_FIELD.fieldApiName,
        
        editable: true
    }
];

// const columns=
// [

//     {label: "Opp Name", fieldName: "Name"},
//     {label: "Stage Name", fieldName: "StageName"},
//     {label: "Amount", fieldName:"Amount"}

// ];

export default class Datatable_relatedOpp extends LightningElement {

    columns = COLS;
    opps=[];
    draftvalues = [];
    @api recordId;

    @wire(getOppRecords, {id: '$recordId'}) 
    wiredOpps({data, error})
    {
        if(data)
        {
            this.opps = data;
            //console.log(data);
            console.log(this.opps)
        }
    }


  async  handleSave(event)
    {
        const updatedFields = event.detail.draftvalues;
        console.log(JSON.stringify(event.detail.draftvalues))  //return undefined
        console.log(JSON.stringify(updatedFields ))  //return undefined
        //console.log(this.draftValues )

        updateOppRecords({OppData: updatedFields })
        .then( result => 
            {console.log(JSON.stringify(result))})

        .catch( error=>
            {console.log(error)})

        //this.draftValues = [];
        // Display fresh data in the datatable
        return refreshApex(this.wiredOpps);
        //refreshApex(this.opps);

    };

}