import { LightningElement, api, track } from 'lwc';
import selectProduct from '@salesforce/apex/HomeSProductController.selectProduct';

export default class ProductTitle extends LightningElement {
    @api recordid;
    @api tileview = false;
    @track product = {
        Name: ""
    };

    connectedCallback() {
        selectProduct({id: this.recordid})
        .then(result=>{
            this.product=result;
            console.log(result);
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title:'Error!',
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });
    }
}