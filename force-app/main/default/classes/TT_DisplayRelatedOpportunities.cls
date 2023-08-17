public with sharing class TT_DisplayRelatedOpportunities {
    
    @AuraEnabled(cacheable=true)
    // public static List<Opportunity> getOppList(String recordId) {
    //     return [SELECT Id, Name FROM Opportunity];
    // }
    public static List<Account> getOppList(String recordId) {
        return [SELECT Id, Name FROM Account];
    }

}