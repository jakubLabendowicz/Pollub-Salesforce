import { LightningElement, api, track } from 'lwc';
import getUserId from '@salesforce/apex/HomeSProductCommentController.getUserId';
import upsertProductComment from '@salesforce/apex/HomeSProductCommentController.upsertProductComment';
import deleteProductComment from '@salesforce/apex/HomeSProductCommentController.deleteProductComment';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import opinions from '@salesforce/label/c.Opinions';
import rate from '@salesforce/label/c.Rate';

export default class ProductComment extends LightningElement {
    @track showSpinner = false;
    @api productcomment;
    @api new = false;
    @track productCommentContent = '';
    @track productCommentRate = 0;

    @track edit = false;
    @track showButtons = false;
    @track isDeleted = false;


    @track star1 = false;
    @track star2 = false;
    @track star3 = false;
    @track star4 = false;
    @track star5 = false;

    connectedCallback() {
        this.showSpinner = true;
        this.productCommentContent = this.productcomment.Content__c;
        this.productCommentRate = this.productcomment.Rate__c;

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


        getUserId()
        .then(result=>{
            if(result == this.productcomment.CreatedById) {
                this.showButtons = true;
            }
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

    handleEditButton() {
        this.edit = true;
    }

    handleDeleteButton() {
        deleteProductComment({id: this.productcomment.Id})
        .then(result=>{
            this.productcomment = result;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        this.edit = false;
        this.isDeleted = true;
    }

    handleCancelButton() {
        this.edit = false;
    }

    handleSaveButton() {
        upsertProductComment({productComment: {
            Id: this.productcomment.Id,
            Content__c: this.productCommentContent,
            Rate__c: this.productCommentRate,
            User_name__c: this.productcomment.User_name__c,
            CreatedById: this.productcomment.CreatedById
        }})
        .then(result=>{
            this.productcomment = result;
        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });

        this.edit = false;
    }

    handleProductCommentContentChange(event) {
        this.productCommentContent = event.target.value;
    }
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
}