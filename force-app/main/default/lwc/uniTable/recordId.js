import { LightningElement } from 'lwc';

export default class StackedVerticalGrid extends LightningElement {
    accounts = [
        {
            id: "1",
            name: "Company 1",
            vendorName: "Vendor 1",
            status: "Status 1",
            purchaseAgreement: "Agreement 1"
        }, {
            id: "2",
            name: "Company 2",
            vendorName: "Vendor 2",
            status: "Status 2",
            purchaseAgreement: "Agreement 2"
        }, {
            id: "4",
            name: "Company 3",
            vendorName: "Vendor 3",
            status: "Status 3",
            purchaseAgreement: "Agreement 3"
        },
    ];
}