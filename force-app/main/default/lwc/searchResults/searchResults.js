import { LightningElement, api, track, wire } from 'lwc';
import selectProducts from '@salesforce/apex/HomeSProductController.selectProducts';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';

export default class SearchResults extends NavigationMixin(LightningElement) {
    currentPageReference;

    @track products = [];
    @track noRecords = false;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    get term() {
        let value = this.currentPageReference && this.currentPageReference.state.c__term;
        if(value != undefined) return value
        else return "";
    }
    get family() {
        let value = this.currentPageReference && this.currentPageReference.state.c__family;
        if(value != undefined) return value
        else return "";
    }
    get manufacturer() {
        let value = this.currentPageReference && this.currentPageReference.state.c__manufacturer;
        if(value != undefined) return value
        else return "";
    }
    get color() {
        let value = this.currentPageReference && this.currentPageReference.state.c__color;
        if(value != undefined) return value
        else return "";
    }
    get dimensions() {
        let value = this.currentPageReference && this.currentPageReference.state.c__dimensions;
        if(value != undefined) return value
        else return "";
    }
    get weight() {
        let value = this.currentPageReference && this.currentPageReference.state.c__weighty;
        if(value != undefined) return value
        else return "";
    }
    get supplyVoltage() {
        let value = this.currentPageReference && this.currentPageReference.state.c__supplyVoltage;
        if(value != undefined) return value
        else return "";
    }
    get workingTemperature() {
        let value = this.currentPageReference && this.currentPageReference.state.c__workingTemperature;
        if(value != undefined) return value
        else return "";
    }

    connectedCallback() {
        let product = {
            Name: this.term,
            Family: this.family,
            Manufacturer__c: this.manufacturer,
            Color__c: this.color,
            Dimensions__c: this.dimensions,
            Weight__c: this.weight,
            Supply_voltage__c: this.supplyVoltage,
            Working_temperature__c: this.workingTemperature
        };
        selectProducts({product: product})
        .then(result=>{
            this.products=result;
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
        let product = {
            Name: this.term,
            Family: this.family,
            Manufacturer__c: this.manufacturer,
            Color__c: this.color,
            Dimensions__c: this.dimensions,
            Weight__c: this.weight,
            Supply_voltage__c: this.supplyVoltage,
            Working_temperature__c: this.workingTemperature
        };
        selectProducts({product: product})
        .then(result=>{
            this.products=result;
            if(this.products.length == 0) {
                this.noRecords = true;
            } else {
                this.noRecords = false;
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