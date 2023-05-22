import { LightningElement, track } from 'lwc';

export default class HdfcFixedDepositCalculator extends LightningElement {
    principal;
    interest;
    year;
    @track maturityamount;

    handlePrincipalChange(event) {
        this.principal = parseInt(event.target.value); 
    }

    handleYearChange(event) {
        this.year = parseInt(event.target.value);
    }

    handleInterestChange(event) {
        this.interest = parseInt(event.target.value);
    }

    calculate() {
        this.maturityamount = this.principal * this.interest * this.year / 100;
    }
}