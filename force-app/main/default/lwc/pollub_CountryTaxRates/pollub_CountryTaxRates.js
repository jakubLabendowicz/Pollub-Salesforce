import { LightningElement, track, api } from 'lwc';
import selectCountryTaxRates from '@salesforce/apex/Pollub_CountryTaxRatesController.selectCountryTaxRates';
import selectInvoice from '@salesforce/apex/Pollub_CountryTaxRatesController.selectInvoice';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Pollub_CountriesTaxes extends LightningElement {
    @track showSpinner = false;
    @track countryTaxRates = [];
    @track invoice = {};

    @api recordId;

    connectedCallback() {
        this.showSpinner = true;

        selectInvoice({id: this.recordId})
        .then(result=>{
            this.invoice=result;
            this.showSpinner = false;

            selectCountryTaxRates()
            .then(result=>{
                this.countryTaxRates=result.map((countryTaxRate, index) => {
                    return {
                        record: countryTaxRate,
                        taxAmount: this.invoice.Amount__c * (countryTaxRate.Tax__c / 100)
                    }
                });
                console.log(this.countryTaxRates);
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