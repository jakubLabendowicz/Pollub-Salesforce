import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getCart from '@salesforce/apex/HomeSCartController.getCart';
import makeOrder from '@salesforce/apex/HomeSCartController.makeOrder';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import order from '@salesforce/label/c.Order';

export default class CartMakeOrder extends LightningElement {
    @track showSpinner = false;
    @track label = {
        order: order
    };
    @track cart;

    connectedCallback() {
        this.showSpinner = true;
        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
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

    handleMakeOrderClick(event) {
        this.showSpinner = true;
        makeOrder()
        .then(()=>{
            const successToastEvent = new ShowToastEvent({
                title: success,
                message: 'Order created successfully!',
                variant:'Success'
            });
            this.dispatchEvent(successToastEvent);
            this.showSpinner = false;
            window.open("/s/order/Order/Default", "_self");
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