public with sharing class BannerController {
    @AuraEnabled(cacheable=true)  
    
    public static Maintenance_Notification__mdt getBannerDetail() {
        
        return [ 
                SELECT Id, Maintenance_Start_Date__c, Maintenance_End_Date__c, Message__c
                FROM Maintenance_Notification__mdt 
                // where DeveloperName ='Salesforce_Release' 
                LIMIT 1
               ];
    }
    }