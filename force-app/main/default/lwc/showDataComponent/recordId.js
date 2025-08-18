import { LightningElement, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';
import { wire } from 'lwc';

export default class ShowDataComponent extends NavigationMixin(LightningElement) {
    @api view; // 'summary' or 'individual'
    @wire(CurrentPageReference)
    pageRef;

    get isSummaryView() {
        return this.view === 'summary';
    }

    get isIndividualView() {
        return this.view === 'individual';
    }

    connectedCallback() {
        this.setViewFromParams();
    }

    setViewFromParams() {
        if (this.pageRef && this.pageRef.state) {
            this.view = this.pageRef.state.c__view || 'summary';
        }
    }
}