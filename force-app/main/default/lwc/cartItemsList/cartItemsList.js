import { LightningElement, track } from 'lwc';
import getCart from '@salesforce/apex/HomeSCartController.getCart';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import products from '@salesforce/label/c.Products';

export default class CartItemsList extends LightningElement {
    @track showSpinner = false;
    @track label = {
        products: products
    };
    @track cart;
    @track cartOrderItems = [];
    @track noRecords = false;

    connectedCallback() {
        this.showSpinner = true;
        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
            this.cartOrderItems = JSON.parse(result).cartOrderItems;
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


    renderedCallback() {
        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
            this.cartOrderItems = JSON.parse(result).cartOrderItems;
            if(this.cartOrderItems.length == 0) {
                this.noRecords = true;
            }
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });
    }

}