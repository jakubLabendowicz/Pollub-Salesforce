import { LightningElement, track } from 'lwc';
import selectCases from '@salesforce/apex/HomeSCaseController.selectCases';

import success from '@salesforce/label/c.Success';
import errorText from '@salesforce/label/c.Error';
import subject from '@salesforce/label/c.Subject';
import description from '@salesforce/label/c.Description';
import reason from '@salesforce/label/c.Reason';
import status from '@salesforce/label/c.Status';
import dateTimeOpened from '@salesforce/label/c.DateTimeOpened';
import caseNumber from '@salesforce/label/c.CaseNumber';

export default class CaseList extends LightningElement {
    @track showSpinner = false;
    @track label = {
        subject: subject,
        description: description,
        reason: reason,
        status: status,
        dateTimeOpened: dateTimeOpened,
        caseNumber: caseNumber
    };

    @track cases = [];

    connectedCallback() {
        this.showSpinner = true;
        selectCases()
        .then(result=>{
            this.cases=result;
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

    handleShowCase(event) {
        window.open("/s/case/" + event.target.value, "_self");
    }
}