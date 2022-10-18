public with sharing class Pollub_InvoiceTriggerHandler extends TriggerHandler {
    private void beforeInsert() {
        List<Invoice__c> newInvoices = (List<Invoice__c>) Trigger.new;
        Pollub_InvoiceTriggerService.calculateTax(newInvoices);
    }
    private void beforeUpdate() {
        List<Invoice__c> newInvoices = (List<Invoice__c>) Trigger.new;
        Pollub_InvoiceTriggerService.calculateTax(newInvoices);
    }
}