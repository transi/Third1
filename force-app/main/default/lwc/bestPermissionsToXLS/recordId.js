import { LightningElement, wire ,track} from 'lwc';
import getPermissionSets from '@salesforce/apex/PermissionSetController.getPermissionSets';
import getPermissions from '@salesforce/apex/PermissionSetController.getPermissions';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import SheetJS from '@salesforce/resourceUrl/SheetJS'; // The static resource for SheetJS

export default class PermissionsExplorer extends LightningElement {
    selectedPermissionSet;
    isLoading = false;
    permissionSetOptions = [];
    @track objectPermissions = [];

    async connectedCallback() {
        await loadScript(this, SheetJS); // load the library
        // At this point, the library is accessible with the `XLSX` variable
        this.version = XLSX.version;
        console.log('version: '+this.version);
    }

    @wire(getPermissionSets)
    wiredPermissionSets({ error, data }) {
        if (data) {
            this.permissionSetOptions = data.map((item) => {
                return { label: item.Name, value: item.Id };
            });
        } else if (error) {
            console.error('Error fetching permission sets: ', error);
        }
    }

    handlePermissionSetChange(event) {
        this.selectedPermissionSet = event.detail.value;
        if (this.selectedPermissionSet) {
            this.isLoading = true; // Show the spinner when the user selects a permission set
            this.fetchObjectPermissions(this.selectedPermissionSet);
        } else {
            this.objectPermissions = [];
        }
    }

    fetchObjectPermissions(permissionSetId) {
        getPermissions({ permissionSetId: permissionSetId })
            .then((data) => {
                this.objectPermissions = this.prepareObjectPermissions(data);
                this.isLoading = false; // Hide the spinner when data is fetched successfully
            })
            .catch((error) => {
                console.error('Error fetching permissions: ', error);
                this.isLoading = false; // Hide the spinner when data is fetched successfully
            });
    }

    prepareObjectPermissions(data) {
        let preparedData = [];
        for (const objectName in data) {
            if (data.hasOwnProperty(objectName)) {
                const sheetData = data[objectName];
                for (const record of sheetData) {
                    preparedData.push({
                        SObjectType: record.SObjectType,
                        PermissionsRead: record.PermissionsRead,
                        PermissionsCreate: record.PermissionsCreate,
                        PermissionsEdit: record.PermissionsEdit,
                        PermissionsDelete: record.PermissionsDelete,
                        PermissionsViewlAll: record.PermissionsViewlAll,
                        PermissionsModifyAll: record.PermissionsModifyAll,
                    });
                }
            }
        }
        return preparedData;
    }
    
    handleGenerateExcel() {
        getPermissions({ permissionSetId: this.selectedPermissionSet })
            .then((data) => {
                this.downloadExcel(data);
            })
            .catch((error) => {
                console.error('Error fetching permissions: ', error);
            });
    }

    downloadExcel(data) {
        const filename = 'PermissionSetPermissions.xlsx';
        const workbook = XLSX.utils.book_new();
        const headers = [];
        const worksheetData = [];

        for (const objectName in data) {
            if (data.hasOwnProperty(objectName)) {
                const sheetData = data[objectName];
                for (const record of sheetData) {
                    worksheetData.push({
                        "Object": record.SObjectType,
                        "Read": record.PermissionsRead,
                        "Create":record.PermissionsCreate,
                        "Edit": record.PermissionsEdit,
                        "Delete": record.PermissionsDelete,
                        "View All": record.PermissionsViewlAll,
                        "Modify All": record.PermissionsModifyAll,
                    });
                }
            }
        }

        const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: headers });
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Object Permissions');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Create a download link and click it programmatically to initiate the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();

        // Release the object URL to free up memory
        URL.revokeObjectURL(a.href);
    }
    
}