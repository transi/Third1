import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSubscribedAccounts from '@salesforce/apex/AccountController.getSubscribedAccounts';
import removeAccountSubscription from '@salesforce/apex/AccountController.removeAccountSubscription';
import { refreshApex } from '@salesforce/apex';
export default class SubscribedAccountsList extends NavigationMixin(LightningElement) {
    accounts = [];
    wiredAccountsResult;
    isLoading = false;

    @wire(getSubscribedAccounts)
    wiredSubscribedAccounts(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
        } else if (result.error) {
            console.error('Error retrieving subscribed accounts:', result.error);
        }
    }
    handleRefresh() {
        
        this.isLoading = true; // Show the spinner

        refreshApex(this.wiredAccountsResult)
            .finally(() => {
                this.isLoading = false; // Hide the spinner
            });
    }

    handleAccountClick(event) {
        const accountId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }

    handleRemoveClick(event) {
        const accountId = event.target.dataset.id;
        removeAccountSubscription({ accountId })
            .then(result => {
                if (result) {
                    this.accounts = this.accounts.filter(account => account.Id !== accountId);
                    localStorage.setItem('subscribedAccounts', JSON.stringify(this.accounts));
                    this.showToast('Success', 'Account subscription removed.', 'success');
                } else {
                    this.showToast('Error', 'Failed to remove account subscription.', 'error');
                }
            })
            .catch(error => {
                console.error('Error removing account subscription:', error);
                this.showToast('Error', 'Failed to remove account subscription.', 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}