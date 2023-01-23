public with sharing class FSLAccountClass {
    public FSLAccountClass() {
       System.debug('Hi');
    }
 
 @AuraEnabled(cacheable=true)
 public static List<Account> recentlyViwedAccMethod(){
     try {
     
         List<Account> accList = [SELECT Id, Name, LastViewedDate, Site, Phone, Rating FROM account WHERE LastViewedDate != null ORDER BY LastViewedDate DESC ];
     return accList;
         
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
         
     }
     
 }
 
 @AuraEnabled(cacheable=true)
 public static List<Account> thisMonthAccMethod(){
     try {
         
         List<Account> thisMoAccList = [SELECT Id, Name, CreatedDate, Site, Phone, Rating FROM Account WHERE CreatedDate = THIS_MONTH WITH SECURITY_ENFORCED];
         return thisMoAccList;
 
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
         
     }
 }
 
 @AuraEnabled(cacheable=true)
 public static List<Account> halfYearAccMethod(){
     try {
         
         List<Account> halfYearAccList = [SELECT Id, Name, CreatedDate, Site, Phone, Rating FROM Account WHERE CreatedDate = THIS_QUARTER WITH SECURITY_ENFORCED];
         return halfYearAccList;
 
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
         
     }
 }
 
 @AuraEnabled(cacheable=true)
 Public static List<Account> thisYearAccMethod(){
     try {
         
         List<Account> thisYearAccList = [SELECT Id, Name, CreatedDate, Site, Phone, Rating FROM Account WHERE CreatedDate = THIS_YEAR WITH SECURITY_ENFORCED];
         return thisYearAccList;
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
         
     }
 }
 
 @AuraEnabled(cacheable=true)
 public static List<Account> allAccountMethod(){
     try {
         
         List<Account> allAccList = [select id, Name, Site, Phone, Rating from Account WITH SECURITY_ENFORCED];
         return allAccList;
 
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
         
     }
     }
   }
 
