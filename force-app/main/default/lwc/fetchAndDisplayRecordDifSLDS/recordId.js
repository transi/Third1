import { LightningElement, track, wire} from 'lwc';
import getAccounts from '@salesforce/apex/getRecordDataController.getAccounts';

export default class GetDataDisplayData extends LightningElement {
     @track columns = [
          { label: 'Name', fieldName: 'Name' },
          { label: 'Id', fieldName: 'Id'}
      ];
     @track accountList;

     //Method 2
     @wire (getAccounts) wiredAccounts({data,error}){
          if (data) {
               this.accountList = data;
          console.log(data); 
          } else if (error) {
          console.log(error);
          }
     }
}

// import { getRecord } from 'lightning/uiRecordApi';
// import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

// export default class GetDataDisplayData extends LightningElement {
// //This is how you will bind your recordId and fields
// @wire(getRecord, { recordId: '$recordId',fields: ACCOUNT_NAME_FIELD })
//     accountData;

// //Now if you want to access Account Name of current record then simply you can use it for example :

//  get accName(){
// // This is how you will get the value 
//  return accountData.data.fields.Name.value;
//  }
// }