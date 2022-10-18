import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import selectProduct from '@salesforce/apex/HomeSProductController.selectProduct';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';

export default class SearchTile extends LightningElement {
    @api recordid;
    @track product = {
        Name: ""
    };

    connectedCallback() {
        selectProduct({id: this.recordid})
        .then(result=>{
            this.product=result;
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


    navigateToRecordViewPage() {
        window.open("/s/product/" + this.recordid, "_self");
        // View a custom object record.
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordid,
                objectApiName: 'Product2',
                actionName: 'view'
            }
        });
    }
}