import { LightningElement } from 'lwc';
import getContactRecords from '@salesforce/apex/LazyLoadingController2.getContactRecords';

const PAGE_SIZE = 10;
export default class LazyLoadingTable extends LightningElement {
   
      tableColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Email', fieldName: 'Email', type: 'email' }
      ];
    
      visibleData = [];
      isLoading = false;
      currentPage = 0;
      totalRecords = 0;
    
      connectedCallback() {
        this.loadMoreData();
      }
    
      handleScroll(event) {
        const target = event.target;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight) {
          this.loadMoreData();
        }
      }
    
      loadMoreData() {
        if (this.isLoading) {
          return; // Prevent multiple simultaneous calls
        }
    
        this.isLoading = true;
        this.currentPage++;
    
        getContactRecords({ pageSize: PAGE_SIZE, page: this.currentPage })
          .then((data) => {
            if (data && data.contacts.length > 0) {
              this.visibleData = [...this.visibleData, ...data.contacts];
            }
          })
          .catch((error) => {
            console.error('Error fetching more contact records:', error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }