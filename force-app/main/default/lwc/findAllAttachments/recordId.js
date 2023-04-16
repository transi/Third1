import { LightningElement, api, wire } from 'lwc';
import getAllAttachments from '@salesforce/apex/FindAllAttachments.getRelatedFilesByRecordId'
import {NavigationMixin} from 'lightning/navigation'

export default class FilePreviewDownload extends NavigationMixin(LightningElement) {

    @api recordId;
    allAttachments =[]
    @wire(getAllAttachments, {recordId: '$recordId'})
    wiredAttachments({data, error}){ 
        if(data){ 
            this.allAttachments = Object.keys(data).map(item=>({"label":data[item],
             "value": item,
             "url":`/sfc/servlet.shepherd/document/download/${item}`
            }))
        }
        if(error){ 
            console.log(error)
        }
    }
    previewHandler(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }
}