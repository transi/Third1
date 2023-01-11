import { LightningElement } from 'lwc';

export default class DisplayModal extends LightningElement {
    openModal = false;
    handleOpenModal() {
        this.openModal = true;
    }
    handleCloseModal() {
        this.openModal = false;
    }
}