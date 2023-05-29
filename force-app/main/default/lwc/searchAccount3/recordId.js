import { LightningElement, track } from 'lwc';
importgetAccounts from '@salesforce/apex/AccountService.getAccounts';
export default class SearchAccount extends LightningElement {
	@track accounts;
	@track error;
	handleKeyChange(event){
		constsearchKey = event.target.value;
		getAccounts({ strAccountName: searchKey })
		.then(result => {
			this.accounts = result;
			this.error = undefined;
		})
		.catch(error => {
			this.error = error;
			this.accounts = undefined;
		})
	} 
}