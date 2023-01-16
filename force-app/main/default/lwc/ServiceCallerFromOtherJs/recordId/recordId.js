import { LightningElement } from 'lwc';
import { getAccounts } from 'c/recordId2';
export default class ApexServiceCaller extends LightningElement {
    accountList;
    async connectedCallback() {
        this.accountList = await getAccounts();
        console.log('account list call', this.accountList);
    }
}