import { LightningElement, track } from 'lwc';
import insertPricebook from '@salesforce/apex/HomeSPriceBookController.insertPricebook';
import selectPricebookEntrys from '@salesforce/apex/HomeSPriceBookController.selectPricebookEntrys';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import priceBook_created_successfully from '@salesforce/label/c.PriceBook_created_successfully';



import create_new_pricebook from '@salesforce/label/c.Create_New_Pricebook';
import price_book_name from '@salesforce/label/c.Price_Book_Name';
import description from '@salesforce/label/c.Description';
import price_reduction_type from '@salesforce/label/c.Price_Reduction_Type';
import price_reduction_value from '@salesforce/label/c.Price_Reduction_Value';
import active from '@salesforce/label/c.Active';
import start_time from '@salesforce/label/c.Start_Time';
import end_time from '@salesforce/label/c.End_Time';
import select from '@salesforce/label/c.Select';
import product_name from '@salesforce/label/c.Product_Name';
import product_code from '@salesforce/label/c.Product_Code';
import list_price from '@salesforce/label/c.List_Price';
import save from '@salesforce/label/c.Save';

export default class PricebookForm extends LightningElement {
    @track showSpinner = false;
    @track label = {
        success: success,
        errorText: errorText,
        priceBook_created_successfully: priceBook_created_successfully,
        create_new_pricebook: create_new_pricebook,
        price_book_name: price_book_name,
        description: description,
        price_reduction_type: price_reduction_type,
        price_reduction_value: price_reduction_value,
        active: active,
        start_time: start_time,
        end_time: end_time,
        select: select,
        product_name: product_name,
        product_code: product_code,
        list_price: list_price,
        save: save
    };


    @track pricebookId = '';
    @track pricebook = {
        IsActive: true,
        Description: '',
        End_time__c: '',
        Name: '',
        Start_time__c: ''
    }
    @track priceReductionType = '';
    @track priceReductionValue = 0;
    @track pricebookEntrys = [];
    @track pricebookEntrysIds = [];
    @track isPercent = true;

    get options() {
        return [
            { label: 'Percent', value: 'Percent' },
            { label: 'Currency', value: 'Currency' },
            { label: 'New price', value: 'New price' },
        ];
    }

    handlePricebookActiveChange(event) {
        this.pricebook.IsActive = event.target.value;
    }
    handlePricebookDescriptionChange(event) {
        this.pricebook.Description = event.target.value;
    }
    handlePriceReductionTypeChange(event) {
        this.priceReductionType = event.target.value;
        if(event.target.value == 'Percent') {
            this.isPercent = true;
        } else {
            this.isPercent = false;
        }
    }
    handlePriceReductionValueChange(event) {
        this.priceReductionValue = event.target.value;
    }
    handlePricebookEndTimeChange(event) {
        this.pricebook.End_time__c = event.target.value;
    }
    handlePricebookNameChange(event) {
        this.pricebook.Name = event.target.value;
    }
    handlePricebookStartTimeChange(event) {
        this.pricebook.Start_time__c = event.target.value;
    }
    handleSelectPricebookEntryChange(event) {
        this.pricebookEntrysIds.push(event.target.title);
    }


    savePricebook() {
        this.showSpinner = true;
        insertPricebook({pricebook:this.pricebook, pricebookEntrysIds:this.pricebookEntrysIds, priceReductionType:this.priceReductionType, priceReductionValue:this.priceReductionValue})
        .then(result=>{
            this.pricebookId=result.Id;
            
            const toastEvent = new ShowToastEvent({
              title: success,
              message: priceBook_created_successfully,
              variant:'success'
            });
            this.dispatchEvent(toastEvent);

            this.pricebook = {
                IsActive: true,
                Description: '',
                End_time__c: '',
                Name: '',
                Start_time__c: ''
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

    connectedCallback() {
        this.showSpinner = true;
        selectPricebookEntrys()
        .then(result=>{
            this.pricebookEntrys=result;
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
}