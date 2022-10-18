public with sharing class Pollub_PropertyInvoicesAmountSumCtrl {
    @AuraEnabled
    public static Decimal selectPropertyInvoicesAmountSum(Id id){
        try {
            List<Invoice__c> invoices = [
                SELECT Id, Name, Amount__c
                FROM Invoice__c
                WHERE Property__c = :id
            ];
            Decimal propertyInvoicesAmountSum = 0;
            for (Invoice__c invoice : invoices) {
                if (invoice.Amount__c != null) {
                    propertyInvoicesAmountSum = propertyInvoicesAmountSum + invoice.Amount__c;
                }
            }
            return propertyInvoicesAmountSum;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}