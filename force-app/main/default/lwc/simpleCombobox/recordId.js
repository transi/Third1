import { LightningElement } from 'lwc';
export default class ComboboxBasic extends LightningElement {
    value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
            { label: 'New1', value: 'new1' },
            { label: 'old', value: 'old' },
            { label: 'main', value: 'main' },
            { label: 'exclusive', value: 'exclusive' },
            { label: 'deployed', value: 'deployed' },
            { label: 'not use', value: 'not use' },
            { label: 'last', value: 'last' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}