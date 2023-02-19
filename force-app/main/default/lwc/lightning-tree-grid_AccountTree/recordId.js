import { LightningElement, wire, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

// Import Apex
import getAllParentAccounts from "@salesforce/apex/DynamicTreeGridController.getAllParentAccounts";
import getChildAccounts from "@salesforce/apex/DynamicTreeGridController.getChildAccounts";

// Global Constants
const COLS = [
    //{ fieldName: "CaseNumber", label: "Case Number" },
   // { fieldName: "ParentAccountName", label: "Parent Account" },
    {
        label: "Case Number",
        fieldName: "CaseURL",
        type: "url",
        typeAttributes: { label: { fieldName: "CaseNumber" }, tooltip: "CaseNumber", target: "_blank" }
    },
    { fieldName: "Type", label: "Account Type" }
];

export default class DynamicTreeGrid extends LightningElement {
    @api recordId;
    gridColumns = COLS;
    isLoading = true;
    gridData = [];

    @wire(getAllParentAccounts, {recordId: '$recordId'})
    parentAccounts({ error, data }) {
        if (error) {
            console.error("error loading accounts", error);
        } else if (data) {
            this.gridData = data.map((account) => ({
                _children: [],
                ...account
                //ParentAccountName: account.Parent?.Name
            }));
            //this.finalData = this.gridData;
           this.gridData.forEach(item => item['CaseURL'] = '/lightning/r/Case/' + item['Id'] + '/view');
            console.log('gridData=='+JSON.stringify(this.gridData));
            this.isLoading = false;
        }
    }

    handleOnToggle(event) {
        console.log(event.detail.name);
        console.log(event.detail.hasChildrenContent);
        console.log(event.detail.isExpanded);
        console.log('rowid=='+event.detail.row.Id);
        console.log('row=='+JSON.stringify(event.detail.row));
        console.log('rowCaseNum=='+event.detail.row.CaseNumber);
        const rowName = event.detail.name;
        var childId = event.detail.row.Id;
        console.log('rowName=='+rowName);
        if (!event.detail.hasChildrenContent && event.detail.isExpanded) {
            this.isLoading = true;
            getChildAccounts({ parentId: rowName })
                .then((result) => {
                    console.log(result);
                    if (result && result.length > 0) {
                        const newChildren = result.map((child) => ({
                            _children: [],
                            ...child
                            //ParentAccountName: child.Parent?.Name
                        }));
                        this.gridData = this.getNewDataWithChildren(
                            rowName,
                            this.gridData,
                            newChildren
                        );
                        //this.finalData = this.gridData;
                        this.gridData.forEach(item => item['CaseURL'] = '/lightning/r/Case/' + childId + '/view');
                        console.log('child grid data==='+JSON.stringify(this.gridData));
                        console.log('newChildren=='+JSON.stringify(newChildren));
                    } else {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "No children",
                                message: "No children for the selected Account",
                                variant: "warning"
                            })
                        );
                    }
                })
                .catch((error) => {
                    console.log("Error loading child accounts", error);
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error Loading Children Accounts",
                            message: error + " " + error?.message,
                            variant: "error"
                        })
                    );
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }

    getNewDataWithChildren(rowName, data, children) {
        return data.map((row) => {
            let hasChildrenContent = false;
            if (
                Object.prototype.hasOwnProperty.call(row, "_children") &&
                Array.isArray(row._children) &&
                row._children.length > 0
            ) {
                hasChildrenContent = true;
            }

            if (row.Id === rowName) {
                row._children = children;
            } else if (hasChildrenContent) {
                this.getNewDataWithChildren(rowName, row._children, children);
            }
            return row;
        });
    }
}