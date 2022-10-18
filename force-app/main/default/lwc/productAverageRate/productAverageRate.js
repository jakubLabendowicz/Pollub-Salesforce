import { LightningElement, track, api } from 'lwc';
import selectAverageRate from '@salesforce/apex/HomeSProductCommentController.selectAverageRate';

export default class ProductAverageRate extends LightningElement {
    @track showSpinner = false;
    @api recordid;
    @track productAverageRate = 0;
    @track stars = [{index: 1, active: true}, {index: 2, active: false}, {index: 3, active: false}, {index: 4, active: false}, {index: 5, active: false}];
    @track star1 = false;
    @track star2 = false;
    @track star3 = false;
    @track star4 = false;
    @track star5 = false;

    connectedCallback() {
        // this.showSpinner = true;
        selectAverageRate({id: this.recordid})
        .then(result=>{
            if(result >= 1) {
                this.star1 = true;
            }
            if(result >= 2) {
                this.star2 = true;
            }
            if(result >= 3) {
                this.star3 = true;
            }
            if(result >= 4) {
                this.star4 = true;
            }
            if(result >= 5) {
                this.star5 = true;
            }
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

    renderedCallback() {
        selectAverageRate({id: this.recordid})
        .then(result=>{
            if(result >= 1) {
                this.star1 = true;
            }
            if(result >= 2) {
                this.star2 = true;
            }
            if(result >= 3) {
                this.star3 = true;
            }
            if(result >= 4) {
                this.star4 = true;
            }
            if(result >= 5) {
                this.star5 = true;
            }
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