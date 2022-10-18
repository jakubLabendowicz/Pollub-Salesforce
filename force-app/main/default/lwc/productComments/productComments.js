import { LightningElement, api, track } from 'lwc';

import insertProductComment from '@salesforce/apex/HomeSProductCommentController.insertProductComment';
import selectProductComments from '@salesforce/apex/HomeSProductCommentController.selectProductComments';

import getUserId from '@salesforce/apex/HomeSProductCommentController.getUserId';
import getUserName from '@salesforce/apex/HomeSProductCommentController.getUserName';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import opinions from '@salesforce/label/c.Opinions';
import rate from '@salesforce/label/c.Rate';


export default class ProductComments extends LightningElement {
    @track label = {
        opinions: opinions,
        rate: rate
    };

    @track showSpinner = false;
    @track userId = '';
    @track userName = '';
    
    @api recordId;
    @track productComments;

    @track showNew = true;
    @track isNew = false;
    @track newProductComment = {
        Content__c: '',
        Rate__c: 0,
        Product__c: this.recordId,
        User_name__c: ''
    };
    @track productCommentContent = '';
    @track productCommentRate = 0;

    @track star1 = false;
    @track star2 = false;
    @track star3 = false;
    @track star4 = false;
    @track star5 = false;

    

    connectedCallback() {
        this.showSpinner = true;
        getUserId()
        .then(result=>{
            this.userId=result;
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

        getUserName()
        .then(result=>{
            this.userName=result;
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

        selectProductComments({id: this.recordId})
        .then(result=>{
            this.productComments=result;
            this.productComments.forEach(productComment => {
                if(productComment.CreatedById == this.userId) {
                    this.showNew = false;
                }
            });
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
        getUserId()
        .then(result=>{
            this.userId=result;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        getUserName()
        .then(result=>{
            this.userName=result;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        selectProductComments({id: this.recordId})
        .then(result=>{
            this.productComments=result;
            this.showNew = true;
            result.forEach(productComment => {
                if(productComment.CreatedById == this.userId) {
                    this.showNew = false;
                }
            });
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

    
    handleProductCommentContentChange(event) {
        this.productCommentContent = event.target.value;
    }
    // handleProductCommentRateChange(event) {
    //     this.productCommentRate = event.target.value;
    //     this.productCommentRate = event.target.dataset.starValue;
    // }

    handleProductCommentRateChange(event) {
        this.productCommentRate = event.target.value;
        this.productCommentRate = event.target.dataset.starValue;

        this.star1 = false;
        this.star2 = false;
        this.star3 = false;
        this.star4 = false;
        this.star5 = false;
        if(this.productCommentRate >= 1) {
            this.star1 = true;
        }
        if(this.productCommentRate >= 2) {
            this.star2 = true;
        }
        if(this.productCommentRate >= 3) {
            this.star3 = true;
        }
        if(this.productCommentRate >= 4) {
            this.star4 = true;
        }
        if(this.productCommentRate >= 5) {
            this.star5 = true;
        }
    }

    handleNewButton() {
        this.isNew = true;
    }

    handleCancelButton() {
        this.isNew = false;
    }

    handleSaveButton() {
        insertProductComment({productComment: {
            Content__c: this.productCommentContent,
            Rate__c: this.productCommentRate,
            Product__c: this.recordId,
            User_name__c: this.userName,
            User__c: this.userId
        }})
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        selectProductComments({id: this.recordId})
        .then(result=>{
            this.productComments=result;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        this.isNew = false;
    }

}