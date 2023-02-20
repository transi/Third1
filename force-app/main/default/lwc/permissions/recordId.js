// userPermissionCheck.js
import { LightningElement } from 'lwc';
import hasRunReports from '@salesforce/userPermission/RunReports';
//to check custom permission
// import hasCustomPermission from '@salesforce/customPermission/Custom_Permission_Api_Name';
export default class PermissionCheck extends LightningElement {
    get isRunReport() {
        return hasRunReports;
    }
}