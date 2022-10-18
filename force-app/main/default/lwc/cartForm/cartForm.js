import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getCart from '@salesforce/apex/HomeSCartController.getCart';
import addShippingAddress from '@salesforce/apex/HomeSCartController.addShippingAddress';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import shippingAddressAddedSuccessfully from '@salesforce/label/c.ShippingAddressAddedSuccessfully';
import shippingAddress from '@salesforce/label/c.ShippingAddress';

import shippingStreet from '@salesforce/label/c.ShippingStreet';
import shippingCity from '@salesforce/label/c.ShippingCity';
import shippingStateProvince from '@salesforce/label/c.ShippingStateProvince';
import shippingZipPostalCode from '@salesforce/label/c.ShippingZipPostalCode';
import shippingCountry from '@salesforce/label/c.ShippingCountry';
import apply from '@salesforce/label/c.Apply';


export default class CartForm extends LightningElement {
    @track showSpinner = false;
    @track label = {
        shippingAddress: shippingAddress,
        shippingStreet: shippingStreet,
        shippingCity: shippingCity,
        shippingStateProvince: shippingStateProvince,
        shippingZipPostalCode: shippingZipPostalCode,
        shippingCountry: shippingCountry,
        apply: apply
    };

    @track cart;
    @track shippingAddress = {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    };

    connectedCallback() {
        this.showSpinner = true;
        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
            if(JSON.parse(result).cartOrder.shippingAddress != null) {
                this.shippingAddress = JSON.parse(result).cartOrder.shippingAddress;
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

    handleStreetChange(event) {
        this.shippingAddress.street = event.target.value;
    }
    handleCityChange(event) {
        this.shippingAddress.city = event.target.value;
    }
    handleStateChange(event) {
        this.shippingAddress.state = event.target.value;
    }
    handleZipCodeChange(event) {
        this.shippingAddress.zipCode = event.target.value;
    }
    handleCountryChange(event) {
        this.shippingAddress.country = event.target.value;
    }


    handleApplyClick(event) {
        this.showSpinner = true;
        addShippingAddress({shippingAddress: JSON.stringify(this.shippingAddress)})
        .then(()=>{
            const successToastEvent = new ShowToastEvent({
                title: success,
                message: shippingAddressAddedSuccessfully,
                variant:'Success'
            });
            this.dispatchEvent(successToastEvent);
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