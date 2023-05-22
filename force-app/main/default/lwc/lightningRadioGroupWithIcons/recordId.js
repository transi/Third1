import { LightningElement } from 'lwc';

export default class TrafficLight extends LightningElement {
    options = [
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Red', value: 'red' },
    ];

    selectedColour;

    handleChange(event) {
        this.selectedColour = event.detail.value;
    }

    get isGreen() {
        return this.selectedColour === 'green';
    }

    get isYellow() {
        return this.selectedColour === 'yellow';
    }
}