import { LightningElement, track, wire, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import insertCase from '@salesforce/apex/HomeSCaseController.insertCase';
import updateComplaintTrue from '@salesforce/apex/HomeSOrderController.updateComplaintTrue';

import CASE_OBJECT from '@salesforce/schema/Case';
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';


import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import subject from '@salesforce/label/c.Subject';
import description from '@salesforce/label/c.Description';
import reason from '@salesforce/label/c.Reason';
import status from '@salesforce/label/c.Status';
import dateTimeOpened from '@salesforce/label/c.DateTimeOpened';
import caseNumber from '@salesforce/label/c.CaseNumber';
import caseCreatedSuccessfully from '@salesforce/label/c.CaseCreatedSuccessfully';
import complaint from '@salesforce/label/c.Complaint';
import close from '@salesforce/label/c.Close';
import cancel from '@salesforce/label/c.Cancel';
import addComplaint from '@salesforce/label/c.AddComplaint';




export default class CaseForm extends LightningElement {
    @track showSpinner = false;
    @track label = {
        subject: subject,
        description: description,
        reason: reason,
        status: status,
        dateTimeOpened: dateTimeOpened,
        caseNumber: caseNumber,
        complaint: complaint,
        close: close,
        cancel: cancel,
        addComplaint: addComplaint
    };

    @api order;
    @api orderitem;

    @track caseId;
    @track newCase = {
        Subject: '',
        Description: '',
        Reason: '--None--',
        Order__c: ''
    };

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    caseMetadata;
    @wire(getPicklistValues,
        {
            recordTypeId: '$caseMetadata.data.defaultRecordTypeId', 
            fieldApiName: REASON_FIELD
        }
    )
    caseReasonPicklist;




    handleCaseSubjectChange(event) {
        this.newCase.Subject = event.target.value;
    }
    handleCaseDescriptionChange(event) {
        this.newCase.Description = event.target.value;
    }
    handleCaseReasonChange(event) {
        this.newCase.Reason = event.target.value;
    }





    @track isModalOpen = false;

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }

    saveCase() {
        this.showSpinner = true;
        this.newCase.Order__c = this.order.Id;
        this.newCase.ProductId = this.orderitem.Product2Id;

        insertCase({newCase:this.newCase})
        .then(result=>{
            this.caseId=result.Id;
            
            const toastEvent = new ShowToastEvent({
              title: success,
              message: caseCreatedSuccessfully,
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
            this.closeModal();
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


        updateComplaintTrue({orderItemId:this.orderitem.Id})
        .catch(error=>{
           const errorToastEvent = new ShowToastEvent({
                title: errorText,
                message:error.message,
                variant:'Error'
            });
            this.dispatchEvent(errorToastEvent);
        });
    }

    goToComplaint() {
        window.open("/s/case/Case/Default", "_self");
    }
}