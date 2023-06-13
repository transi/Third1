import { LightningElement} from 'lwc'; import { NavigationMixin } from 'lightning/navigation';

export default class PRM_NavigationCompPCC extends NavigationMixin(LightningElement) {

    menuItems = [
        { id: 1, label: 'Home', target: '/newAdmin/s/ddr' },
        { id: 2, label: 'Opportunity', target: '/newAdmin/s/opportunity/Opportunity/Default' },
        { id: 3, label: 'Reports', target: '/newAdmin/s/report/Report/Recent' },
        { id: 4, label: 'Bulk Upload', target: '/newAdmin/s/bulkupload' }
    ];


    handleNavigation(event) {
        const target = event.target.dataset.target;
        this.template.querySelector('li').activeTabValue = target;
        if (target) {
            this.navigateToPage(target);
        }
    }

    navigateToPage(pageUrl) {
        window.location.href = pageUrl;
    }
}