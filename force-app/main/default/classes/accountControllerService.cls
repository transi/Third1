public with sharing class accountControllerService {
    @AuraEnabled
    public static List<Account> fetchAccounts(){
        try {
            return [select id, Name from Account limit 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}