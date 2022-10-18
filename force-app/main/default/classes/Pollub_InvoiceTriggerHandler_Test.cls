@isTest
private class Pollub_InvoiceTriggerHandler_Test{
    @TestSetup
    static void makeData(){
        List<Country_Tax_Rate__c> countryTaxRates = new List<Country_Tax_Rate__c>{
            new Country_Tax_Rate__c(Country__c = 'Poland', Tax__c = 23),
            new Country_Tax_Rate__c(Country__c = 'Australia', Tax__c = 50),
            new Country_Tax_Rate__c(Country__c = 'Brazil', Tax__c = 15),
            new Country_Tax_Rate__c(Country__c = 'Egypt', Tax__c = 43),
            new Country_Tax_Rate__c(Country__c = 'France', Tax__c = 20)
        };
        insert countryTaxRates;
    }

    @isTest
    static void shouldCalcualteTaxWhenOneRecordIsInserted() {
        List<Invoice__c> invoices = new List<Invoice__c>{
            new Invoice__c(Amount__c = 100, Country__c = 'Poland')
        };
        Boolean isException = false;
        Test.startTest();
        try {
            insert invoices;
        } catch(Exception e) {
            isException = true;
        }
        Test.stopTest();
        List<Invoice__c> invoicesToAssert = [SELECT Id, Tax__c, Tax_Amount__c FROM Invoice__c];
        System.assertEquals(false, isException);
        System.assertNotEquals(null, invoicesToAssert[0].Tax__c);
        System.assertNotEquals(null, invoicesToAssert[0].Tax_Amount__c);
    }

    @isTest
    static void shouldNotCalcualteTaxWhenOneRecordIsInserted() {
        List<Invoice__c> invoices = new List<Invoice__c>{
            new Invoice__c(Amount__c = 100, Country__c = 'Test')
        };
        Boolean isException = false;
        Test.startTest();
        try {
            insert invoices;
        } catch(Exception e) {
            isException = true;
        }
        Test.stopTest();
        System.assertEquals(true, isException);
    }

    @isTest
    static void shouldCalcualteTaxWhenManyRecordsAreInserted() {
        List<Invoice__c> invoices = new List<Invoice__c>{
            new Invoice__c(Amount__c = 100, Country__c = 'Poland'),
            new Invoice__c(Amount__c = 100, Country__c = 'Australia'),
            new Invoice__c(Amount__c = 100, Country__c = 'Brazil'),
            new Invoice__c(Amount__c = 100, Country__c = 'Egypt'),
            new Invoice__c(Amount__c = 100, Country__c = 'France')
        };
        Boolean isException = false;
        Test.startTest();
        try {
            insert invoices;
        } catch(Exception e) {
            isException = true;
        }
        Test.stopTest();
        List<Invoice__c> invoicesToAssert = [SELECT Id, Tax__c, Tax_Amount__c FROM Invoice__c];
        System.assertEquals(false, isException);
        for(Invoice__c invoiceToAssert: invoicesToAssert) {
            System.assertNotEquals(null, invoiceToAssert.Tax__c);
            System.assertNotEquals(null, invoiceToAssert.Tax_Amount__c);
        }
    }

    @isTest
    static void shouldNotCalcualteTaxWhenManyRecordsAreInserted() {
        List<Invoice__c> invoices = new List<Invoice__c>{
            new Invoice__c(Amount__c = 100, Country__c = 'Test'),
            new Invoice__c(Amount__c = 100, Country__c = 'Australia'),
            new Invoice__c(Amount__c = 100, Country__c = 'Brazil'),
            new Invoice__c(Amount__c = 100, Country__c = 'Egypt'),
            new Invoice__c(Amount__c = 100, Country__c = 'France')
        };
        Boolean isException = false;
        Test.startTest();
        try {
            insert invoices;
        } catch(Exception e) {
            isException = true;
        }
        Test.stopTest();
        System.assertEquals(true, isException);
    }
}