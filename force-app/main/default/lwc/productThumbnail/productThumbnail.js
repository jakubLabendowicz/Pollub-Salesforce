import { LightningElement, api, track } from 'lwc';
import selectContentDocumentLinksSrcs from '@salesforce/apex/HomeSContentDocumentLinkController.selectContentDocumentLinksSrcs';

export default class ProductThumbnail extends LightningElement {
    @track showSpinner = false;
    @api recordid;

    @track contentDocumentLinksSrc;

    connectedCallback() {
        this.showSpinner = true;
        selectContentDocumentLinksSrcs({productId:this.recordid})
        .then(result=>{
            this.contentDocumentLinksSrc = result[0];
            this.showSpinner = false;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title:'Error!',
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }
}