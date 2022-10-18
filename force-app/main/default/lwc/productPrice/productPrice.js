import { LightningElement, api, track } from 'lwc';
import selectPrice from '@salesforce/apex/HomeSPriceBookController.selectPrice';

export default class ProductPrice extends LightningElement {
    @track showSpinner = false;
    @api recordid;
    @api tileview = false;
    @track productPrice = 0;

    connectedCallback() {
        this.showSpinner = true;
        selectPrice({id: this.recordid})
        .then(result=>{
            this.productPrice=result;
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