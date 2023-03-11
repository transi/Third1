import ACCOUNT_NAME from '@salesforce/schema/Account.Name'


export default class MyComponent extends LightningElement {
    fields = [
        ACCOUNT_NAME.fieldApiName,
    ]

    showForm = false

    newRecord () {
        this.showForm = true
    }

    closeDialog () {
        this.showForm = false
    }
}