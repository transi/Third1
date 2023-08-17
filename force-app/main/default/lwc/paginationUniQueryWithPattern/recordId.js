//We import all our apex methods and the keyword we are going to use
import { LightningElement, api, wire, track } from "lwc";
import getTotalNumberOfResults from "@salesforce/apex/queryClass.getTotalNumberOfResults";
import getResultsFromQuery from "@salesforce/apex/queryClass.getResultsFromQuery";
import getFieldsAndObjectNamesFromSoql from "@salesforce/apex/queryClass.getFieldsAndObjectNamesFromSoql";

export default class Datatable extends LightningElement {
  //These two variables are directly set on the app builder, this is why I am using the api keyword
  @api query;
  @api ResultsPerPage;
  //These two will be used to populate the data table
  @track columns = [];
  @track data = [];

  //Variables used when the wire service doesn't get data
  errorOnData;
  errorOnFields;
  errorOnNumberOfResults;

  pageNumber = 1; //When the page is loaded, pageNumber = 1. After this, pageNumber can be changed(by clicking on "Next" for example), which will trigger our wire service
  totalNumberOfResults;
  objectName; //the name is retrieved from a regex in the apex method getFieldsAndObjectNamesFromSoql

  //This getter is not necessary in this situation, because the totalNumberOfPages is not going to change.
  //But it could be changing in the future if we add a feature to allow users to delete records for example
  @api
  get totalNumberOfPages() {
    return Math.ceil(this.totalNumberOfResults / this.ResultsPerPage);
  }
  //We get the total number of results only to be able to handle the
  @wire(getTotalNumberOfResults, { query: "$query" })
  wiredTotalNumberOfResults({ error, data }) {
    if (data) {
      this.totalNumberOfResults = data;
      this.errorOnNumberOfResults = undefined;
    } else if (error) {
      this.totalNumberOfResults = undefined;
      this.errorOnNumberOfResults = error;
    }
  }
  //We get all the fields and object names of the request => if the query is //SELECT id, name from Account, it will return a list with Id, Name, Account inside of it
  @wire(getFieldsAndObjectNamesFromSoql, {
    query: "$query"
  })
  wiredFieldNames({ error, data }) {
    if (data) {
      const dataClone = [...data]; // We clone the list to be able to manipulate our data
      this.objectName = dataClone.pop(); //We remove the last index(the object name) and we save them into a variable.
      //We will only use it to display it as a title. The other indexes of the list will be used for the data table
      this.columns = dataClone.map((fieldName) => {
        //We create the columns we are gonna use for the data table
        return {
          label: fieldName,
          fieldName: fieldName,
          type: "text"
        };
      });
      this.errorOnFields = undefined; //If data, we don't have any error
    } else if (error) {
      this.columns = undefined; //If error, we have no column, but an error that we are saving!
      this.errorOnFields = error;
    }
  }

  // With this method, we are doing a SOQL query every time the page changes. The $ sign allows us to handle the case when one of our variables is null
  @wire(getResultsFromQuery, {
    query: "$query",
    ResultsPerPage: "$ResultsPerPage",
    pageNumber: "$pageNumber"
  })
  //Same logic here: if we get data, we save it. If not, we don't and save //the error
  wiredData({ error, data }) {
    if (data) {
      this.data = data;
      this.errorOnData = undefined;
    } else if (error) {
      this.errorOnData = error;
      console.error(error);
    }
  }

  handleNext() {
    if (this.pageNumber < this.totalNumberOfPages) {
      //We don't want to have an unlimited number of pages, the maximum number is calculated on the totalNumberOfPages variable
      this.pageNumber += 1; //If we click on "Next", we move to the page after
    }
  }
  handlePrevious() {
    if (this.pageNumber > 1) {
      //We don't want to have a negative number of pages, the minimum number is 1
      this.pageNumber -= 1; //If we click on "Previous", we move to the page before
    }
  }
  handleFirst() {
    this.pageNumber = 1; //If we click on "First", we move to the first page
  }
  handleLast() {
    this.pageNumber = this.totalNumberOfPages; //If we click on "Last", we move to the last page(calculated above)
  }

  @api
  get disablePrevButtons() {
    //Allows us to disable the "First" and "Previous" buttons when it's needed(ie when we are on page 1)
    return this.pageNumber === 1;
  }

  // Method to disable the "Next" and "Last" buttons
  @api
  get disableNextButtons() {
    //Allows us to disable the "Next" and "Last" buttons when it's needed(ie when we are on the last page for example)
    return (
      this.pageNumber === this.totalNumberOfPages ||
      this.totalNumberOfPages === 0
    );
  }
}
