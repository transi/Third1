import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getObjectApiNames from "@salesforce/apex/UpsertRecordsHandler.getObjectApiNames";
import UpsertRecordsFromCSV from "@salesforce/apex/UpsertRecordsHandler.UpsertRecordsFromCSV";

export default class UpsertRecords extends LightningElement {
  objectNames = []; //We define a list. It will get all the object names for the "Select Object" picklist
  errorOnGettingObjectNames; //This variable will be useful if we encounter an error by trying to get the object names
  errorOnUpsert; //Same, but for the upsert

  get acceptedFormats() {
    //At this time, we are only accepting csv files, but who knows?
    return [".csv"];
  }

  csvFileId; //This variable will be given to the UpsertRecordsFromCSV method, which will query the actual csv, then, will manipulate it, and upsert some records
  selectedObject = "Account"; //When the page loads, the selected object of the picklist is "Account", but it can change on the onchange event

  getSelectedObject(event) {
    this.selectedObject = event.target.value; //When the user changes value, we save the new value inside the selected object variable
  }

  get objectNamesForPicklist() {
    //Picklists in LWC need a list of objects to work. So, when we receive data on object names, we will handle the list to be able to display it on our picklist
    //getter mehods are reactive
    return this.objectNames.map((str) => ({ label: str, value: str }));
  }

  @wire(getObjectApiNames) //With this method, we call the getObjectApiNames apex method, and we get all the object names of the org
  wiredNames({ error, data }) {
    if (data) {
      this.objectNames = data;
      this.errorOnGettingObjectNames = undefined;
    } else if (error) {
      this.errorOnGettingObjectNames = error;
      this.objectNames = undefined;
    }
  }

  handleFileInputChange(event) {
    //When the user uploads a file on our LWC, we get its Id. It will be used on the UpsertRecordsFromCSV method
    this.csvFileId = event.detail.files[0].documentId;
  }

  handleUpsert() {
    //When the user clicks on "Upsert", we:1)Call the UpsertRecordsFromCSV, and 2)show a message on the screen
    UpsertRecordsFromCSV({
      sObjectName: this.selectedObject,
      csvFileId: this.csvFileId
    })
      .then((result) => {
        const success = new ShowToastEvent({
          variant: "success",
          title: "Success",
          message: "The upsert worked!"
        });
        this.dispatchEvent(success);
      })
      .catch((error) => {
        this.errorOnUpsert = error;
        const failure = new ShowToastEvent({
          variant: "error",
          title: "Error",
          message: "The upsert didn't work!"
        });
        this.dispatchEvent(failure);
      });
  }
}