import { LightningElement,api} from "lwc";
export default class LwcModalWithFlow extends LightningElement {
    isShowModal = true;
    @api recordId;
    //pass input variables to the flow when component is loaded
    get inputVariables() {
        return [
            {
                name: 'oppId',
                type: 'String',
                value: this.recordId
            }
        ];
    }    
    handleStatusChange(event){
        if (event.detail.status === "FINISHED") {
            this.isShowModal = false;
        }        
    }
}