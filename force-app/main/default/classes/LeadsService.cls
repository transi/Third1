public with sharing class LeadsService {
    
    @AuraEnabled (cacheable = true)
    public static List<Lead> getLeads()
    {
        List<Lead> lstLeads = [SELECT Id,Name FROM Lead LIMIT 2];
        return lstLeads;
    }
}