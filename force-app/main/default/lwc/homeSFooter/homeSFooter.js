import { LightningElement, track } from 'lwc';

import copyright from '@salesforce/label/c.Copyright';
import copyright2 from '@salesforce/label/c.Copyright2';
import copyright3 from '@salesforce/label/c.Copyright3';

import menu from '@salesforce/label/c.Menu';
import home from '@salesforce/label/c.Home';
import search from '@salesforce/label/c.Search';
import cart from '@salesforce/label/c.Cart';
import orders from '@salesforce/label/c.Orders';
import cases from '@salesforce/label/c.Cases';
import social_media from '@salesforce/label/c.Social_Media';
import facebook from '@salesforce/label/c.Facebook';
import instagram from '@salesforce/label/c.Instagram';
import snapchat from '@salesforce/label/c.Snapchat';
import tikTok from '@salesforce/label/c.TikTok';
import twitter from '@salesforce/label/c.Twitter';
import our_other_shops from '@salesforce/label/c.Our_Other_Shops';
import carS from '@salesforce/label/c.CarS';
import gardenS from '@salesforce/label/c.GardenS';
import bookS from '@salesforce/label/c.BookS';

export default class HomeSFooter extends LightningElement {
    @track label = {
        copyright: copyright,
        copyright2: copyright2,
        copyright3: copyright3,
        menu: menu,
        home: home,
        search: search,
        cart: cart,
        orders: orders,
        cases: cases,
        social_media: social_media,
        facebook: facebook,
        instagram: instagram,
        snapchat: snapchat,
        tikTok: tikTok,
        twitter: twitter,
        our_other_shops: our_other_shops,
        carS: carS,
        gardenS: gardenS,
        bookS: bookS
    };
}