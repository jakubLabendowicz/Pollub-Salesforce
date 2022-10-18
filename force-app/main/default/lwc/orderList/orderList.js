import { LightningElement, track } from 'lwc';
import selectOrders from '@salesforce/apex/HomeSOrderController.selectOrders';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class OrderList extends LightningElement {
    @track showSpinner = false;
    @track orders = [];

    connectedCallback() {
        this.showSpinner = true;
        selectOrders()
        .then(result=>{
            this.orders=result;
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
        selectOrders()
        .then(result=>{
            this.orders=result;
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

    handleShowOrder(event) {
        window.open("/s/order/" + event.target.value, "_self");
    }
}