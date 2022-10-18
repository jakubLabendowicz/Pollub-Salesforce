public with sharing class Pollub_CountryTaxRatesController {
    @AuraEnabled
    public static List<Country_Tax_Rate__c> selectCountryTaxRates(){
        try {
            List<Country_Tax_Rate__c> countryTaxRates = [
                SELECT Id, Name, Country__c, Tax__c
                FROM Country_Tax_Rate__c
            ];
            return countryTaxRates;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Invoice__c selectInvoice(Id id){
        try {
            List<Invoice__c> countryTaxRates = [
                SELECT Id, Name, Amount__c
                FROM Invoice__c
                WHERE Id = :id
            ];
            return countryTaxRates[0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}