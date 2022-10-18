import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import selectManufacturerOptions from '@salesforce/apex/HomeSFilterController.selectManufacturerOptions';
import selectColorOptions from '@salesforce/apex/HomeSFilterController.selectColorOptions';
import selectDimensionsOptions from '@salesforce/apex/HomeSFilterController.selectDimensionsOptions';
import selectWeightOptions from '@salesforce/apex/HomeSFilterController.selectWeightOptions';
import selectSupplyVoltageOptions from '@salesforce/apex/HomeSFilterController.selectSupplyVoltageOptions';
import selectWorkingTemperatureOptions from '@salesforce/apex/HomeSFilterController.selectWorkingTemperatureOptions';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import working_temperature from '@salesforce/label/c.Working_temperature';
import supply_voltage from '@salesforce/label/c.Supply_voltage';
import weight from '@salesforce/label/c.Weight';
import dimensions from '@salesforce/label/c.Dimensions';
import color from '@salesforce/label/c.Color';
import manufacturer from '@salesforce/label/c.Manufacturer';

import cancel from '@salesforce/label/c.Cancel';
import search from '@salesforce/label/c.Search';
import filters from '@salesforce/label/c.Filters';
import close from '@salesforce/label/c.Close';

export default class SearchFiltres extends NavigationMixin(LightningElement) {
    @track label = {
        working_temperature: working_temperature,
        supply_voltage: supply_voltage,
        weight: weight,
        dimensions: dimensions,
        color: color,
        manufacturer: manufacturer,
        cancel: cancel,
        search: search,
        filters: filters,
        close: close
    };

    currentPageReference;

    @api term;

    @track manufacturerOptions = [{label: '--None--', value: '--None--'}];
    @track colorOptions = [{label: '--None--', value: '--None--'}];
    @track dimensionsOptions = [{label: '--None--', value: '--None--'}];
    @track weightOptions = [{label: '--None--', value: '--None--'}];
    @track supplyVoltageOptions = [{label: '--None--', value: '--None--'}];
    @track workingTemperatureOptions = [{label: '--None--', value: '--None--'}];

    connectedCallback() {
        selectManufacturerOptions()
        .then(result=>{
            for(let item of result) {
                this.manufacturerOptions.push({label: item, value: item});
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

        selectColorOptions()
        .then(result=>{
            for(let item of result) {
                this.colorOptions.push({label: item, value: item});
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

        selectDimensionsOptions()
        .then(result=>{
            for(let item of result) {
                this.dimensionsOptions.push({label: item, value: item});
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

        selectWeightOptions()
        .then(result=>{
            for(let item of result) {
                this.weightOptions.push({label: item, value: item});
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

        selectSupplyVoltageOptions()
        .then(result=>{
            for(let item of result) {
                this.supplyVoltageOptions.push({label: item, value: item});
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

        selectWorkingTemperatureOptions()
        .then(result=>{
            for(let item of result) {
                this.workingTemperatureOptions.push({label: item, value: item});
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


    @track filterManufacturer = '--None--';
    @track filterColor = '--None--';
    @track filterDimensions = '--None--';
    @track filterWeight = '--None--';
    @track filterSupplyVoltage = '--None--';
    @track filterWorkingTemperature = '--None--';

    handleFilterManufacturerChange(event) {
        this.filterManufacturer = event.target.value;
    }
    handleFilterColorChange(event) {
        this.filterColor = event.target.value;
    }
    handleFilterDimensionsChange(event) {
        this.filterDimensions = event.target.value;
    }
    handleFilterWeightChange(event) {
        this.filterWeight = event.target.value;
    }
    handleFilterSupplyVoltageChange(event) {
        this.filterSupplyVoltage = event.target.value;
    }
    handleFilterWorkingTemperatureChange(event) {
        this.filterWorkingTemperature = event.target.value;   
    }
    

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    getUpdatedPageReference(stateChanges) {
        return Object.assign({}, this.currentPageReference, {
            state: Object.assign({}, this.currentPageReference.state, stateChanges)
        });
    }

    filterPageReference(manufacturer, color, dimensions, weight, supplyVoltage, workingTemperature) {
        return this.getUpdatedPageReference({
            c__manufacturer: manufacturer,
            c__color: color,
            c__dimensions: dimensions,
            c__weight: weight,
            c__supplyVoltage: supplyVoltage,
            c__workingTemperature: workingTemperature
        });
    }

    handleFilterClick(evt) {
        let manufacturer = this.filterManufacturer;
        if(this.filterManufacturer == "--None--") manufacturer = undefined;

        let color = this.filterColor;
        if(this.filterColor == "--None--") color = undefined;

        let dimensions = this.filterDimensions;
        if(this.filterDimensions == "--None--") dimensions = undefined;

        let weight = this.filterWeight;
        if(this.filterWeight == "--None--") weight = undefined;

        let supplyVoltage = this.filterSupplyVoltage;
        if(this.filterSupplyVoltage == "--None--") supplyVoltage = undefined;

        let workingTemperature = this.filterWorkingTemperature;
        if(this.filterWorkingTemperature == "--None--") workingTemperature = undefined;

        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.filterPageReference(
            manufacturer, color, dimensions, weight, supplyVoltage, workingTemperature
            ), true);

        this.isModalOpen = false;
    }

    @track isModalOpen = false;

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
}