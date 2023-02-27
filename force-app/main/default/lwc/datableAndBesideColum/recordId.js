import { LightningElement } from "lwc";

const input = true;
const readonly = true;
const editable = true;

export default class App extends LightningElement {
  // A combination of attributes to use both table and lightning-datatable
  columns = [
    { 
      id: 0, 
      name: 'Input 1', 
      fieldName: 'Input 1', 
      label:'Input 1', 
      type: 'number', 
      editable, 
      input 
    },
    { 
      id: 1,
      action: (event) => this.deleteRow(event), 
      label: 'Action', 
      type: 'button-icon',
      buttonLabel: 'Delete', 
      typeAttributes: { 
        type:'button-icon', 
        name: 'delete',
        value: 'delete',
        label: 'Delete',
        iconName:'utility:delete',
        disabled: false,
      }
    },
  ]
  rows = [
    { id: 0 }
  ]
  handleRowDelete(event) {
    this.rows.splice(event.detail.id, 1);
    this.renumberRows();
  }
  handleCellChange(event) {
    const { draftValues } = event.detail;
    // The first row comes across as row-0, while the others are just numbers
    const rowId = draftValues[0].id === 'row-0'? 0: parseInt(draftValues[0].id);
    this.rows[rowId]['Input 1'] = draftValues[0]['Input 1'];
    this.renumberRows();
  }
  deleteRow(event) {
    this.rows.splice(event.target.dataset.row, 1);
    this.renumberRows();
  }
  // async is a required keyword to use await
  async renumberRows() {
    // lightning-datatable doesn't like it when you take away the last row, so ensure at least one
    if(!this.rows.length) {
      this.rows.push({});
    }
    // This waits for one render cycle, so we can later update the input fields
    await Promise.resolve();
    // Reset the edited state
    this.template.querySelector('lightning-datatable').draftValues = [];
    // Calculate new values for Input 2
    this.rows = this.rows.map((row, id) => ({...row, id }));
    // Fill the inputs with their new values, lightning-datatable does this automatically
    this.rows.forEach((row)=>{
      this.columns.filter(
        (column)=>column.input
      ).forEach((column)=>{
        const input = this.template.querySelector(`input[name="${column.name}"][data-row="${row.id}"]`);
        if(input) {
          input.value = row[column.name];
        }
      })
    });
  }
  // This is the HTML table value change
  handleValueChange(event) {
    const { dataset, name, value } = event.target;
    if(name === 'Input 1') {
      this.rows.forEach((row)=> { row[name]=value; });
    } else {
      this.rows[dataset.row][name] = value;
    }
    this.renumberRows();
  }
  // Handles both tables at once
  handleAddRow(event) {
    this.rows.push({});
    this.renumberRows();
  }

}