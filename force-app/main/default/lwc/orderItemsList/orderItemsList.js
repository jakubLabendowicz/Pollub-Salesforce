import { LightningElement, track, api } from 'lwc';
import selectOrderItems from '@salesforce/apex/HomeSOrderController.selectOrderItems';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class OrderItemsList extends LightningElement {
    @track showSpinner = false;
    @api order;
    @track show_orderItems;

    connectedCallback() {
        this.showSpinner = true;
        selectOrderItems({orderId: this.order.Id})
        .then(result=>{
            this.show_orderItems=result;
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
        selectOrderItems({orderId: this.order.Id})
        .then(result=>{
            this.show_orderItems=result;
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