import { LightningElement, api, wire, track } from 'lwc';
import searchPotentialDuplicates from '@salesforce/apex/PotentialDuplicateComponentController.searchPotentialDuplicates';
import compareSObjects from '@salesforce/apex/PotentialDuplicateComponentController.compareSObjects';
import mergeSObjects from '@salesforce/apex/PotentialDuplicateComponentController.mergeSObjects';   
import { getObjectInfo } from '@salesforce/apex';

export default class PotentialDuplicates extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track potentialDuplicates;
    @track count;
    @track isModalOpen = false;
    @track selectedRowIds = [];
    @track heading;
    @track sobjectName;

    @track fieldNames = [];
   



    

    @wire(searchPotentialDuplicates, { objectApiName: '$objectApiName', recordId: '$recordId' })
    wiredResult({ error, data }) {
        if (data) {
            this.potentialDuplicates = data;
            this.count = this.potentialDuplicates.length;
            this.error = undefined;
            // set selected row as default
            const currentRecord = this.potentialDuplicates.find(record => record.Id === this.recordId);
            if (currentRecord) {
                this.selectedRowIds = [currentRecord.Id];
            }
        } else if (error) {
            this.error = error;
            this.potentialDuplicates = undefined;
        }
        
    }

    get columns() {

        if (this.potentialDuplicates && this.potentialDuplicates.length > 0) {
            
            const fieldNames = Object.keys(this.potentialDuplicates[0])
                                   .filter(fieldName => fieldName != 'Id'); 
            console.log('FIELDS' +fieldNames);   
                                  
            return [
                ...fieldNames.map(fieldName => {
                    return {
                        label: fieldName,
                        fieldName: fieldName
                    };
                })
            ];
        }
        return [];
    }
 
    openModal() {
        this.isModalOpen = true;
        console.log('ffff' +this.potentialDuplicates);
        console.log('fhjkl' +columns);

    }

    closeModal() {
         this.isModalOpen = false;
    }
    
    
    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedRowIds = selectedRows.map(row => row.Id);
        const recordIds = selectedRows.map(row => row.Id);
        console.log("Selected Record Ids: ", recordIds);
    }

    handleNext() {
        this.isModalOpen = false; // hide the first modal
        this.isSecondModalOpen = true; // show the second modal
    }
        
            
        
        
    handlePrevious() {
        this.isSecondModalOpen = false;
        this.isModalOpen = true;
    }  
    connectedCallback() {
    this.sobjectName = this.objectApiName.charAt(0).toUpperCase() + this.objectApiName.slice(1);
    this.heading = `Potential Duplicate ${this.sobjectName} Records`;
}
       







@api
compareSObjects(sobject1, sobject2) {
  let differentFields = [];
  let fields1 = Object.keys(sobject1);
  let fields2 = Object.keys(sobject2);

  for (let fieldName of fields1) {
    if (!fields2.includes(fieldName)) {
      continue;
    }

    let value1 = sobject1[fieldName];
    let value2 = sobject2[fieldName];

    if (value1 !== value2 && (value1 === null || value1 !== value2)) {
      differentFields.push(fieldName);
      
    }
  }

  return differentFields;
}

@api
mergeSObjects(master, toMerge) {
  let masterFields = Object.keys(master);

  for (let mergeObject of toMerge) {
    let mergeFields = Object.keys(mergeObject);

    for (let fieldName of mergeFields) {
      if (!masterFields.includes(fieldName)) {
        continue;
      }

      let value = mergeObject[fieldName];
      master[fieldName] = value;
    }
  }
}            
     }