import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import selectCouponByCode from '@salesforce/apex/HomeSCouponController.selectCouponByCode';
import addCoupon from '@salesforce/apex/HomeSCartController.addCoupon';
import getCart from '@salesforce/apex/HomeSCartController.getCart';
import selectCouponById from '@salesforce/apex/HomeSCouponController.selectCouponById';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';

import summary from '@salesforce/label/c.Summary';
import couponText from '@salesforce/label/c.Coupon';
import orderValueText from '@salesforce/label/c.OrderValue';
import couponValueText from '@salesforce/label/c.CouponValue';
import valueToPayText from '@salesforce/label/c.ValueToPay';
import makeOrder from '@salesforce/label/c.MakeOrder';

import wrongCouponCode from '@salesforce/label/c.WrongCouponCode';


export default class CartSummary extends LightningElement {
    @track showSpinner = false;
    @track label = {
        summary: summary,
        couponText: couponText,
        orderValueText: orderValueText,
        couponValueText: couponValueText,
        valueToPayText: valueToPayText,
        makeOrder: makeOrder
    };

    @track cart;
    @track couponId;
    @track coupon = {
        Code__c: '',
        Active__c: false,
        Price_reduction_value__c: 0,
        Price_reduction_type__c: ''
    };
    @track couponMark = '';
    
    @track couponCode = '';
    
    @track orderValue = 0;
    @track couponValue = 0;
    @track valueToPay = 0;

    

    connectedCallback() {
        this.showSpinner = true;
        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
            this.couponId = JSON.parse(result).cartOrder.couponId;
            console.log(JSON.parse(result));
            this.orderValue = Math.round(this.cart.cartOrder.orderValue*100)/100;

            if(this.couponId != null) {
                selectCouponById({id: this.couponId})
                .then(result=>{
                    this.coupon=result;
                    if(result.Price_reduction_type__c == 'Percent') {
                        this.couponMark = '%';
                        this.couponValue = Math.round(this.orderValue*(1/result.Price_reduction_value__c)*100)/100;
                    } else if(result.Price_reduction_type__c == 'Currency') {
                        this.couponMark = '$';
                        this.couponValue = Math.round(result.Price_reduction_value__c*100)/100;
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
            } else {
                this.showSpinner = false;
            }
            this.valueToPay = Math.round((this.orderValue - this.couponValue)*100)/100;
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
        getCart()
        .then(result=>{
            this.cart = JSON.parse(result);
            this.couponId = JSON.parse(result).cartOrder.couponId;
            this.orderValue = Math.round(this.cart.cartOrder.orderValue*100)/100;

            if(this.couponId != null) {
                selectCouponById({id: this.couponId})
                .then(result=>{
                    this.coupon=result;
                    if(result.Price_reduction_type__c == 'Percent') {
                        this.couponMark = '%';
                        this.couponValue = Math.round(this.orderValue*(1/result.Price_reduction_value__c)*100)/100;
                    } else if(result.Price_reduction_type__c == 'Currency') {
                        this.couponMark = '$';
                        this.couponValue = Math.round(result.Price_reduction_value__c*100)/100;
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
            this.valueToPay = Math.round((this.orderValue - this.couponValue)*100)/100;
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

    handleCouponCodeChange(event) {
        this.couponCode = event.target.value;
    }

    handleCouponCodeApply(event) {
        this.showSpinner = true;
        selectCouponByCode({code:this.couponCode})
        .then(result=>{
            this.coupon=result;
            this.couponValue = this.orderValue*(1/this.coupon.Price_reduction_value__c);
            this.valueToPay = this.orderValue - this.couponValue;


        addCoupon({couponId:result.Id})
        .then(()=>{
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


        })
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message: wrongCouponCode,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }
}