import { LightningElement, wire } from 'lwc';   
import getFields from '@salesforce/apex/LightningDatatableController.getFields';
import getOpps from '@salesforce/apex/LightningDatatableController.getRenewalOpps';
import fieldSetName from '@salesforce/label/c.Field_Set_Name_For_Datatable';


export default class Lightning_datatavle_preview extends LightningElement {
    columns = [];
    objectName = "Opportunity";
   
    connectedCallback() {
        this.getColumns();
	this.getOpportunities();
    }


    getColumns() {
        getFields({objectName: this.objectName, fieldSetName: fieldSetName})
        .then(data => {
            let fields = [];
            data = JSON.parse(data);


            data.forEach(item=>{
                let col = { label: item.label,
                            fieldName: item.fieldPath,
                            cellAttributes: { alignment: 'center' },
                }


                fields.push(col);
            })


            this.columns = fields;
        })
        .catch(error => {
            console.log('fs error - ', error);
        })
    }

    getOpportunities() {
        getOpps({objectName: this.objectName, fieldSetName: fieldSetName})
        .then( result => {
            this.data = result;
            console.log('res - ', result);
        }).catch(error => console.log('data error - ', error));
    }    
}
