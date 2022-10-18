import { LightningElement, api, track } from 'lwc';
import selectProduct from '@salesforce/apex/HomeSProductController.selectProduct';
import selectPrice from '@salesforce/apex/HomeSPriceBookEntryController.selectPrice';
import addProduct from '@salesforce/apex/HomeSCartController.addProduct';
import removeProduct from '@salesforce/apex/HomeSCartController.removeProduct';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';

export default class CartItem extends LightningElement {
    @track showSpinner = false;
    @api cartitem;
    @track product = {
        Name: ""
    };
    @track productPrice = 0;
    @track productListPrice = 0;


    connectedCallback() {
        this.showSpinner = true;
        selectProduct({id: this.cartitem.product2Id})
        .then(result=>{
            this.product=result;
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

        selectPrice({id: this.cartitem.product2Id})
        .then(result=>{
            this.productPrice=result;
            this.productListPrice = Math.round(result*this.cartitem.quantity*100)/100;
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

    renderedCallback() {
        selectProduct({id: this.cartitem.product2Id})
        .then(result=>{
            this.product=result;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        selectPrice({id: this.cartitem.product2Id})
        .then(result=>{
            this.productPrice=result;
            this.productListPrice = Math.round(result*this.cartitem.quantity*100)/100;
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

    handleAddProductClick(event) {
        addProduct({productId:this.cartitem.product2Id})
        .then(()=>{})
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });
        this.cartitem.quantity++;
    }

    handleRemoveProductClick(event) {
        removeProduct({productId:this.cartitem.product2Id})
        .then(()=>{})
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });
        this.cartitem.quantity--;
    }


    navigateToRecordViewPage() {
        window.open("/s/product/" + this.cartitem.product2Id, "_self");
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordid,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        });
    }
}