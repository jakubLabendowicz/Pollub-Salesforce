import { LightningElement, api, track } from 'lwc';
import selectRandomProducts from '@salesforce/apex/HomeSProductController.selectRandomProducts';
import selectCommentedProducts from '@salesforce/apex/HomeSProductController.selectCommentedProducts';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import random from '@salesforce/label/c.Random';
import commented from '@salesforce/label/c.Commented';

export default class ProductRecommendations extends LightningElement {
    @track showSpinner = false;
    @api title;
    @api type;
    @api limit;

    @track products = [];

    connectedCallback() {
        this.showSpinner = true;
        if(this.type == random) {
            selectRandomProducts({resultsLimit: this.limit})
            .then(result=>{
                this.products=result;
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
        } else if(this.type == commented) {
            selectCommentedProducts({resultsLimit: this.limit})
            .then(result=>{
                this.products=result;
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
}