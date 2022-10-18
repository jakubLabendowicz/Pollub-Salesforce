import { LightningElement, api, track } from 'lwc';
import selectProduct from '@salesforce/apex/HomeSProductController.selectProduct';

export default class ProductDetails extends LightningElement {
    @track showSpinner = false;
    @api recordId;
    @track error;
    @track product = {
        Name: ""
    };

    connectedCallback() {
        this.showSpinner = true;
        selectProduct({id: this.recordId})
        .then(result=>{
            this.product=result;
            this.showSpinner = false;
        })
        .catch(error=>{
           this.error=error.message;
           const errorToastEvent = new ShowToastEvent({
                title:'Error!',
                message:this.error,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }
}