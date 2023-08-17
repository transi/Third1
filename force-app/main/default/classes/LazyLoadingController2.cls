
public with sharing class LazyLoadingController2 {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getContactRecords(Integer pageSize, Integer page) {
        Integer offset = Math.max(0, (page - 1) * pageSize);
        List<Contact> contacts = [SELECT Id, Name, Email, Phone FROM Contact ORDER BY Name ASC LIMIT :pageSize OFFSET :offset];
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        
        Map<String, Object> result = new Map<String, Object>();
        result.put('contacts', contacts);
        result.put('totalRecords', totalRecords);
        return result;
    }
}