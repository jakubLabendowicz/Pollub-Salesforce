import { LightningElement, wire, track} from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

import all from '@salesforce/label/c.All';
import gateways from '@salesforce/label/c.Gateways';
import light from '@salesforce/label/c.Light';
import security_and_safety from '@salesforce/label/c.Security_and_safety';
import smart_HVAC from '@salesforce/label/c.Smart_HVAC';
import gates_and_blinds from '@salesforce/label/c.Gates_and_blinds';
import control from '@salesforce/label/c.Control';

export default class SearchCategories extends NavigationMixin(LightningElement) {
    @track label = {
        all: all,
        gateways: gateways,
        light: light,
        security_and_safety: security_and_safety,
        smart_HVAC: smart_HVAC,
        gates_and_blinds: gates_and_blinds,
        control: control
    };

    currentPageReference;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;

        if (this.connected) {
            this.generateUrls();
        } else {
            this.generateUrlOnConnected = true;
        }
    }

    connectedCallback() {
        this.connected = true;
        if (this.generateUrlOnConnected) {
            this.generateUrls();
        }
    }

    allUrl;
    gatewaysUrl;
    lightUrl;
    securityAndSafetyUrl;
    smartHvacUrl;
    gatesAndBlindsUrl;
    controlUrl;

    generateUrls() {
        this[NavigationMixin.GenerateUrl](this.familyPageReference(undefined))
            .then(url => this.allUrl = url);
        this[NavigationMixin.GenerateUrl](this.familyPageReference(gateways))
            .then(url => this.gatewaysUrl = url);
        this[NavigationMixin.GenerateUrl](this.familyPageReference(light))
            .then(url => this.lightUrl = url);
        this[NavigationMixin.GenerateUrl](this.familyPageReference(security_and_safety))
            .then(url => this.securityAndSafetyUrl = url);
        this[NavigationMixin.GenerateUrl](this.familyPageReference(smart_HVAC))
            .then(url => this.smartHvacUrl = url);
        this[NavigationMixin.GenerateUrl](this.familyPageReference(gates_and_blinds))
            .then(url => this.gatesAndBlindsUrl = url);
        this[NavigationMixin.GenerateUrl](this.familyPageReference(control))
            .then(url => this.controlUrl = url);
    }

    getUpdatedPageReference(stateChanges) {
        return Object.assign({}, this.currentPageReference, {
            state: Object.assign({}, this.currentPageReference.state, stateChanges)
        });
    }

    familyPageReference(family) {
        return this.getUpdatedPageReference({
            c__family: family
        });
    }

    allClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(undefined), true);
    }

    gatewaysClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(gateways), true);
    }

    lightClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(light), true);
    }

    securityAndSafetyClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(security_and_safety), true);
    }

    smartHvacClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(smart_HVAC), true);
    }

    gatesAndBlindsClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(gates_and_blinds), true);
    }

    controlClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.familyPageReference(control), true);
    }
}