import { LightningElement, api, track } from 'lwc';
import selectContentDocumentLinksSrcs from '@salesforce/apex/HomeSContentDocumentLinkController.selectContentDocumentLinksSrcs';

export default class ProductImages extends LightningElement {
    @track showSpinner = false;
    @api recordId;

    @track contentDocumentLinksSrcs;
    @track contentDocumentLinksSrc;
    @track contentDocumentLinksSrcIndex = 0;

    connectedCallback() {
        this.showSpinner = true;
        selectContentDocumentLinksSrcs({productId:this.recordId})
        .then(result=>{
            console.log(result);
            this.contentDocumentLinksSrcs = result;
            console.log(result[0]);
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

    nextImage() {
        if(this.contentDocumentLinksSrcIndex + 1 < this.contentDocumentLinksSrcs.length) {
            this.contentDocumentLinksSrcIndex++;
        } else {
            this.contentDocumentLinksSrcIndex = 0;
        }
        this.contentDocumentLinksSrc = this.contentDocumentLinksSrcs[this.contentDocumentLinksSrcIndex];
        console.log(this.contentDocumentLinksSrcIndex);
        console.log(this.contentDocumentLinksSrc);
    }

    previousImage() {
        if(this.contentDocumentLinksSrcIndex > 0) {
            this.contentDocumentLinksSrcIndex--;
        } else {
            this.contentDocumentLinksSrcIndex = this.contentDocumentLinksSrcs.length - 1;
        }
        this.contentDocumentLinksSrc = this.contentDocumentLinksSrcs[this.contentDocumentLinksSrcIndex];
        console.log(this.contentDocumentLinksSrcIndex);
        console.log(this.contentDocumentLinksSrc);
    }
}