import { LightningElement,track,api,wire } from 'lwc';
import getAccountList from '@salesforce/apex/GetAccountFieldSetValuesForLwc.getAccountList';
import getsrelatedrecordstoAccount from '@salesforce/apex/GetAccountFieldSetValuesForLwc.getsrelatedrecordstoAccount';
import geRelatedRecordtoDelete from '@salesforce/apex/GetAccountFieldSetValuesForLwc.geRelatedRecordtoDelete';
import getRecordsToCreate from '@salesforce/apex/GetAccountFieldSetValuesForLwc.getRecordsToCreate';
import { updateRecord  } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';

export default class FieldSetComponent extends LightningElement {
    @track account;
    @track relatedrecord = [];
    @track relatedRecordResult;
    @track error;
    @api recordId;
    @track recid;
    @track boolVisible = false;
    @track recName; 
    @track isLoading = false;
   
    /* @track columns=[
    {label:'Last Name', fieldName:'LastName' , type:'text',editable: true} ,
    {label:'Account Name', fieldName:'AccountName' , type:'Picklist',editable: true} 
] */
   
    @wire(getAccountList, { accid: '$recordId' })
    Account({ error, data }) {
        if (data) {
            this.account = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accs = undefined;
        }
    }
   
    @wire(getsrelatedrecordstoAccount,{accid: '$recordId'})

    relatedrec(result){
                this.relatedRecordResult = result;
                if (result.data) {
                    this.relatedrecord =  this.relatedRecordResult.data;
                    this.error = undefined;
                } else if (result.error) {
                    this.error = error;
                    this.relatedrecord = undefined;
                }
            }

    handleDelete(event){
        alert('handleclick');
          //recid = event.target.dataset.id;
          this.recid = event.target.value;
        // const tr = event.target.closest("tr");
        //tr.classList.add('hide');
        //  eval("$A.get('e.force:refreshView').fire();");
          
         alert('recid==='+this.recid);
         this.handleIsLoading(true);
        geRelatedRecordtoDelete({rId:this.recid})
        .then((result) => {
              updateRecord({ fields: { Id: this.recid }})
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);
              this.updateRecordView();
              if(result){
                  this.relatedrecords = result;
                  console.log('relatedrecords after delete'+relatedrecords);
              }
             //updateRecord({ fields: { Id: this.recordId }})
            //return refreshApex(this.relatedRecordResult);
         
        }).catch((err) => {
            this.error = err;
        }).finally(()=>{
            this.handleIsLoading(false);
        });

       /* geRelatedRecordtoDelete({rId:this.recid})
        .then(result => {
                eval("$A.get('e.force:refreshView').fire();");
            })
            .catch(error => {
                console.log('error: ', error);
            }); */
    
    }
    
   
    handleInputSearch(){
        this.boolVisible = true;
    }
   ///handleInputChange(event){
     //   this.recName = event.detail.value;
      //  console.log('recName=='+recName);
       // alert('RecName=='+this.recName);
  // }
   
   handleCreateRecord(){
        this.recName = this.template.querySelector('lightning-input').value;
       
        alert('RecName=='+this.recName);
        alert(' this.recordId=='+ this.recordId);
        getRecordsToCreate({aid : this.recordId,rname :this.recName})
         return refreshApex(this.relatedRecordResult);
        /* .then((result) => {
             
               this[NavigationMixin.Navigate]({ 
              type: 'standard__recordPage', 
              attributes: { recordId: this.recordId, objectApiName: 'Account', actionName: 'view' },
           }); 
           //  updateRecord({ fields: { Id: this.recordId }})
            if(result == true){
                 const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record Created successfully '+result,
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

             } 
        }).catch((err) => {
            
        }); */
       
   }
   handleIsLoading(isLoading) {
        this.isLoading = isLoading;
    }
     updateRecordView() {
       setTimeout(() => {
            eval("$A.get('e.force:refreshView').fire();");
       }, 1000); 
    }
}