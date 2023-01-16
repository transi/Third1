import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class Input extends LightningElement {
    @api objectApiName;
    @api fieldName;

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    objectInfo;

    dataTypeMapping = {
        String: 'text',
        Currency: 'number',
        Double: 'number',
        DateTime: 'datetime',
        Phone: 'phone',
        Boolean: 'checkbox',
        Url: 'url',
        Date: 'date',
        Int: 'number'
    }

    get fieldInfo() {
        if (this.objectInfo && this.objectInfo.data && this.objectInfo.data.fields) {
            let field = this.objectInfo.data.fields[this.fieldName];
            field = JSON.parse(JSON.stringify(field));
            field.dataType = this.dataTypeMapping[field.dataType];
            return field;
        }
        return {};
    }

    handleChange(event) {
        let value;
        if (event.target.type === 'checkbox' || event.target.type === 'checkbox-button' || event.target.type === 'toggle') {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }
        this.dispatchEvent(new CustomEvent('change', { detail: value }));
    }
}