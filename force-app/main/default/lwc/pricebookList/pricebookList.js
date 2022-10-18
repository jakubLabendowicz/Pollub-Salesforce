import { LightningElement, track } from 'lwc';
import selectPricebooks from '@salesforce/apex/HomeSPriceBookController.selectPricebooks';

import price_book_name from '@salesforce/label/c.Price_Book_Name';
import description from '@salesforce/label/c.Description';
import active from '@salesforce/label/c.Active';
import start_time from '@salesforce/label/c.Start_Time';
import end_time from '@salesforce/label/c.End_Time';
import errorText from '@salesforce/label/c.Error';

export default class PricebookList extends LightningElement {
    @track showSpinner = false;
    @track label = {
        errorText: errorText,
        price_book_name: price_book_name,
        description: description,
        active: active,
        start_time: start_time,
        end_time: end_time
    };

    @track pricebooks = [];

    connectedCallback() {
        this.showSpinner = true;
        selectPricebooks()
        .then(result=>{
            this.pricebooks=result;
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
        selectPricebooks()
        .then(result=>{
            this.pricebooks=result;
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