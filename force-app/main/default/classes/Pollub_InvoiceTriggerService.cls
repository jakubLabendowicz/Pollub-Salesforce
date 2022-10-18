public with sharing class Pollub_InvoiceTriggerService {
    public static void calculateTax(List<Invoice__c> newInvoices) {
        Set<String> invoicesCountries = new Set<String>();
        for(Invoice__c invoice: newInvoices) {
            invoicesCountries.add(invoice.Country__c);
        }
        List<Country_Tax_Rate__c> countryTaxRates = [
            SELECT Id, Country__c, Tax__c 
            FROM Country_Tax_Rate__c 
            WHERE Country__c IN :invoicesCountries
        ];
        Map<String, Country_Tax_Rate__c> countryTaxRatesByCountry = new Map<String, Country_Tax_Rate__c>();
        for(Country_Tax_Rate__c countryTaxRate: countryTaxRates) {
            countryTaxRatesByCountry.put(countryTaxRate.Country__c, countryTaxRate);
        }
        for(Invoice__c invoice: newInvoices) {
            invoice.Tax__c = countryTaxRatesByCountry.get(invoice.Country__c).Tax__c;
            invoice.Tax_Amount__c = invoice.Amount__c * (countryTaxRatesByCountry.get(invoice.Country__c).Tax__c / 100);
        }
    }
}