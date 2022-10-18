import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import BLIK from '@salesforce/resourceUrl/pm_blik';
import VISA from '@salesforce/resourceUrl/pm_visa';
import MASTERCARD from '@salesforce/resourceUrl/pm_mastercard';
import GOOGLEPAY from '@salesforce/resourceUrl/pm_google_pay';
import APPLEPAY from '@salesforce/resourceUrl/pm_apple_pay';

import getCart from '@salesforce/apex/HomeSCartController.getCart';
import addPaymentMethod from '@salesforce/apex/HomeSCartController.addPaymentMethod';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import paymentMethodText from '@salesforce/label/c.PaymentMethod';
import paymentMethodSelectedSuccessfully from '@salesforce/label/c.PaymentMethodSelectedSuccessfully';

import blikText from '@salesforce/label/c.Blik';
import visaText from '@salesforce/label/c.Visa';
import mastercardText from '@salesforce/label/c.Mastercard';
import googlePayText from '@salesforce/label/c.GooglePay';
import applePayText from '@salesforce/label/c.ApplePay';

export default class CartPaymentMethod extends LightningElement {
    @track showSpinner = false;
    @track label = {
        paymentMethodText, paymentMethodText
    };

    @track cart;
    @track selectedPaymentMethod;

    @track paymentMethods = [];

    connectedCallback() {
        this.showSpinner = true;
        this.paymentMethods = [
            {imgSrc: BLIK, name: blikText, selected: false},
            {imgSrc: VISA, name: visaText, selected: false},
            {imgSrc: MASTERCARD, name: mastercardText, selected: false},
            {imgSrc: GOOGLEPAY, name: googlePayText, selected: false},
            {imgSrc: APPLEPAY, name: applePayText, selected: false}
        ];

        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
            this.selectedPaymentMethod = JSON.parse(result).cartOrder.paymentMethod;
            for(let payment of this.paymentMethods) {
                if(payment.name == JSON.parse(result).cartOrder.paymentMethod) {
                    payment.selected = true;
                }
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

    handlePaymentMethodSelect(event) {
        this.showSpinner = true;
        var tempPaymentMethods = [
            {imgSrc: BLIK, name: blikText, selected: false},
            {imgSrc: VISA, name: visaText, selected: false},
            {imgSrc: MASTERCARD, name: mastercardText, selected: false},
            {imgSrc: GOOGLEPAY, name: googlePayText, selected: false},
            {imgSrc: APPLEPAY, name: applePayText, selected: false},
        ];
        this.selectedPaymentMethod = event.target.dataset.paymentMethod;
        for(let payment of tempPaymentMethods) {
            if(payment.name == event.target.dataset.paymentMethod) {
                payment.selected = true;
            }
        }
        this.paymentMethods = tempPaymentMethods;

        addPaymentMethod({paymentMethod: event.target.dataset.paymentMethod})
        .then(()=>{
            const successToastEvent = new ShowToastEvent({
                title: success,
                message: paymentMethodSelectedSuccessfully,
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