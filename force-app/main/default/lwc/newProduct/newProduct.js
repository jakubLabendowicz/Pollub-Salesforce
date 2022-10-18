import { LightningElement, track, wire, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import insertProduct from '@salesforce/apex/HomeSProductController.insertProduct';
import insertPriceBookEntry from '@salesforce/apex/HomeSPriceBookEntryController.insertPriceBookEntry';
import selectContentDocumentLinksSrcs from '@salesforce/apex/HomeSContentDocumentLinkController.selectContentDocumentLinksSrcs';

import updateProductDefaultImage from '@salesforce/apex/HomeSProductController.updateProductDefaultImage';

import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import FAMILY_FIELD from '@salesforce/schema/Product2.Family';

import next from '@salesforce/label/c.Next';
import cancel from '@salesforce/label/c.Cancel';
import product_image from '@salesforce/label/c.Product_Image';
import product_price from '@salesforce/label/c.Product_price';
import product_description from '@salesforce/label/c.Product_Description';
import active from '@salesforce/label/c.Active';
import working_temperature from '@salesforce/label/c.Working_temperature';
import supply_voltage from '@salesforce/label/c.Supply_voltage';
import product_family from '@salesforce/label/c.Product_Family';
import product_code from '@salesforce/label/c.Product_Code';
import weight from '@salesforce/label/c.Weight';
import dimensions from '@salesforce/label/c.Dimensions';
import color from '@salesforce/label/c.Color';
import manufacturer from '@salesforce/label/c.Manufacturer';
import product_name from '@salesforce/label/c.Product_Name';
import new_product from '@salesforce/label/c.New_Product';

import image_uploded_successfully from '@salesforce/label/c.Image_uploded_successfully';
import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import priceBook_created_successfully from '@salesforce/label/c.PriceBook_created_successfully';
import product_created_successfully from '@salesforce/label/c.Product_created_successfully';
import default_image_selected from '@salesforce/label/c.Default_image_selected';

export default class NewProduct extends LightningElement {
    @track showSpinner = false;
    @track label = {
        next: next,
        cancel: cancel,
        product_image: product_image,
        product_price: product_price,
        product_description: product_description,
        active: active,
        working_temperature: working_temperature,
        supply_voltage: supply_voltage,
        product_family: product_family,
        product_code: product_code,
        weight: weight,
        dimensions: dimensions,
        color: color,
        manufacturer: manufacturer,
        product_name: product_name,
        new_product: new_product,
        close: close
    };
    
    
    @track error; 

    @track productId;   
    @track product={
        Name:'',
        ProductCode: '',
        Manufacturer__c: '',
        Family: '--None--',
        Color__c: '',
        Supply_voltage__c: '',
        Dimensions__c: '',
        Working_temperature__c: '',
        Weight__c: '',
        IsActive: true,
        Description__c: ''
    };   

    @track priceBookEntryId;   
    @track priceBookEntry={
        IsActive: true,
        Pricebook2Id: '01s7Q0000005z6nQAA',
        Product2Id: '',
        UnitPrice: 0.0
    };  

    handleProductNameChange(event) {
        this.product.Name = event.target.value;
    }
    handleProductCodeChange(event) {
        this.product.ProductCode = event.target.value;
    }
    handleProductManufacturerChange(event) {
        this.product.Manufacturer__c = event.target.value;
    }
    handleProductFamilyChange(event) {
        this.product.Family = event.target.value;
    }
    handleProductColorChange(event) {
        this.product.Color__c = event.target.value;
    }
    handleProductSupplyVoltageChange(event) {
        this.product.Supply_voltage__c = event.target.value;
    }
    handleProductDimensionsChange(event) {
        this.product.Dimensions__c = event.target.value;
    }
    handleProductWorkingTemperatureChange(event) {
        this.product.Working_temperature__c = event.target.value;
    }
    handleProductWeightChange(event) {
        this.product.Weight__c = event.target.value;
    }
    handleProductActiveChange(event) {
        this.product.IsActive = event.target.value;
    }
    handleProductDescriptionChange(event) {
        this.product.Description__c = event.target.value;
    }

    handlePriceBookEntryUnitPriceChange(event) {
        this.priceBookEntry.UnitPrice = event.target.value;
    }

    @track images = []; 

    get acceptedFormats() {
        return ['.jpg', '.png', '.webp', '.svg'];
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.getContentDocumentLinksSrcs();
    }

    @track contentDocumentLinksSrcs = [];
    @track defaultContentDocumentLinkSrc = '';

    getContentDocumentLinksSrcs() {
        this.showSpinner = true;
        selectContentDocumentLinksSrcs({productId:this.productId})
        .then(result=>{
            this.contentDocumentLinksSrcs = result;
            console.log(result);
            
            const toastEvent = new ShowToastEvent({
              title: success,
              message: image_uploded_successfully,
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
            this.showSpinner = false;
        })
        .catch(error=>{
           this.error=error.message;
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:this.error,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }

    handleImageSelect(event) {
        this.showSpinner = true;
        this.defaultContentDocumentLinkSrc = event.target.dataset.imageId;
        event.target.classList.add("selected");

        updateProductDefaultImage({productId:this.productId, defaultImage:event.target.title})
        .then(result=>{
            this.product=result;
            
            const toastEvent = new ShowToastEvent({
              title: success,
              message: default_image_selected,
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
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





    @wire(getObjectInfo, { objectApiName: PRODUCT_OBJECT })
    productMetadata;
    @wire(getPicklistValues,
        {
            recordTypeId: '$productMetadata.data.defaultRecordTypeId', 
            fieldApiName: FAMILY_FIELD
        }
    )
    productFamilyPicklist;





    @track isModalOpen = false;
    @track stage = 0;
    @track productStage = true;
    @track priceStage = false;
    @track imagesStage = false;

    openModal() {
        this.productStage = true;
        this.priceStage = false;
        this.imagesStage = false;
        this.isModalOpen = true;
        this.stage = 0;
    }
    next() {
        this.stage++;
        if(this.stage === 1) {
            this.saveProduct();
            this.productStage = false;
            this.priceStage = true;
            this.imagesStage = flase;
        }
        if(this.stage === 2) {
            this.savePriceBookEntry();
            this.productStage = false;
            this.priceStage = false;
            this.imagesStage = true;
        }
        if(this.stage === 3) {
            this.closeModal();
        }
    }
    closeModal() {
        this.productStage = true;
        this.priceStage = false;
        this.imagesStage = false;
        this.isModalOpen = false;
        this.stage = 0;

        this.product={};
        this.priceBookEntry={};
    }

    saveProduct() {
        this.showSpinner = true;
        insertProduct({product:this.product})
        .then(result=>{
            this.productId=result.Id;
            this.priceBookEntry.Product2Id = result.Id;
            
            const toastEvent = new ShowToastEvent({
              title: success,
              message: product_created_successfully,
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
            this.showSpinner = false;
        })
        .catch(error=>{
           this.error=error.message;
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:this.error,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }


    savePriceBookEntry() {
        this.showSpinner = true;
        insertPriceBookEntry({priceBookEntry:this.priceBookEntry})
        .then(result=>{
            this.priceBookEntryId=result.Id;
            
            const toastEvent = new ShowToastEvent({
              title: success,
              message: priceBook_created_successfully,
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
            this.showSpinner = false;
        })
        .catch(error=>{
           this.error=error.message;
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:this.error,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
            this.showSpinner = false;
        });
    }
}