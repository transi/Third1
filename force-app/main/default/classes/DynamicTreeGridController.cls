public with sharing class DynamicTreeGridController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getAllParentAccounts(Id recordId) {
        return [SELECT CaseNumber, Type FROM Case WHERE Id =: recordId]; 
        // WHERE Id =: recordId
    }

    @AuraEnabled
    public static List<Case> getChildAccounts(Id parentId) {
        return [
            SELECT CaseNumber, Type// Parent.Name
            FROM Case
            WHERE ParentId = :parentId 
        ];
        // 
    }
}