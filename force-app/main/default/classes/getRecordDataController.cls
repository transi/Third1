public with sharing class getRecordDataController {
    //@AuraEnabled is annotation enables LWC to acc
    @AuraEnabled(cacheable=true)
     public static List<Account> getAccounts() {
     return [SELECT Id, Name, Phone FROM Account LIMIT 5];
     }
   }