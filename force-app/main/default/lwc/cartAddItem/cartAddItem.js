import { LightningElement, api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import addProduct from '@salesforce/apex/HomeSCartController.addProduct';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import productAddedToCartSuccesfully from '@salesforce/label/c.ProductAddedToCartSuccesfully';


export default class CartAddItem extends LightningElement {
    @track showSpinner = false;
    @api recordid;

    handleAddProductClick(event) {
        this.showSpinner = true;
        addProduct({productId:this.recordid})
        .then(()=>{
            const successToastEvent = new ShowToastEvent({
                title: success,
                message: productAddedToCartSuccesfully,
                variant:'Success'
            });
            this.dispatchEvent(successToastEvent);
            this.showSpinner = false;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }
}