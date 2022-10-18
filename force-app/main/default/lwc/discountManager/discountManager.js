import { LightningElement, track } from 'lwc';

import create_pricebook from '@salesforce/label/c.Create_Pricebook';
import pricebooks_list from '@salesforce/label/c.Pricebooks_List';

export default class DiscountManager extends LightningElement {
    @track label = {
        create_pricebook: create_pricebook,
        pricebooks_list: pricebooks_list
    };
}