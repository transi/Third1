public class AccountController {
     
    // @AuraEnabled//Get Account Records
    // public static String getAccountList(Integer pageSize, Integer pageNumber){
    //     String jsonDT = '';
         
    //     //Offset for SOQL
    //     Integer offset = (pageNumber - 1) * pageSize;
         
    //     //Total Records
    //     Integer totalRecords = [SELECT COUNT() FROM Account];
    //     Integer recordEnd = pageSize * pageNumber;
         
    //     AccountDTWrapper objDT =  new AccountDTWrapper();  
    //     objDT.pageSize = pageSize;
    //     objDT.pageNumber = pageNumber;
    //     objDT.recordStart = offset + 1;
    //     objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
    //     objDT.totalRecords = totalRecords;
    //     objDT.accounts = [SELECT Id, Name, AccountNumber, Industry, Phone FROM Account LIMIT :pageSize OFFSET :offset];
    //     jsonDT = JSON.serialize(objDT);
    //     return jsonDT;
    // }
     
    public class AccountDTWrapper {
        public Integer pageSize {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordStart {get;set;}
        public Integer recordEnd {get;set;}
        public List<Account> accounts {get;set;}
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id,Name,AccountSource,AnnualRevenue from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsXLS()
    {
        List<Account> accountList = [SELECT Id, Name, ShippingCity, ShippingState, Email__c FROM Account
                                            //  WHERE Email__c !='' 
                                             LIMIT 20];
        return accountList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name FROM Account WITH USER_MODE LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static Account getSingleAccount() {
        return [
            SELECT Id, Name, Phone, Type
            FROM Account
            WITH USER_MODE
            LIMIT 1
        ];
    }

    @AuraEnabled
    public static void randomizeAccountData(Id accountId) {
        try {
            Account acc = [
                SELECT Id, NumberOfEmployees
                FROM Account
                WHERE Id = :accountId
                WITH USER_MODE
                LIMIT 1
            ];
            acc.NumberOfEmployees = Integer.valueof((Math.random() * 100000));
            update as user acc;
        } catch (Exception e) {
            throw new AccountUpdateException(
                'Couldn\'t update account with ID ' + accountId
            );
        }
    }

    public class AccountUpdateException extends Exception {
    }

   @AuraEnabled(cacheable=true)
    public static List<Account> getSubscribedAccounts() {
        List<Account> subscribedAccounts = new List<Account>();
        
        Set<Id> accountIds = new Set<Id>();
        
        List<EntitySubscription> subscriptions = [
            SELECT ParentId
            FROM EntitySubscription
            WHERE SubscriberId = :UserInfo.getUserId()
        ];
        
        Set<Id> accountRecordTypeIds = new Set<Id>();
        for (EntitySubscription subscription : subscriptions) {
            if (subscription.ParentId.getSObjectType() == Account.sObjectType) {
                accountIds.add(subscription.ParentId);
                accountRecordTypeIds.add(subscription.ParentId);
            }
        }
        
        if (!accountRecordTypeIds.isEmpty()) {
            subscribedAccounts = [
                SELECT Id, Name
                FROM Account
                WHERE Id IN :accountRecordTypeIds
            ];
        }
        
        return subscribedAccounts;
    }
    
    @AuraEnabled
    public static Boolean removeAccountSubscription(Id accountId) {
        try {
            List<EntitySubscription> subscriptions = [
                SELECT Id
                FROM EntitySubscription
                WHERE SubscriberId = :UserInfo.getUserId()
                AND ParentId = :accountId
                AND Parent.Type = 'Account'
            ];
            
            if (!subscriptions.isEmpty()) {
                delete subscriptions;
                return true;
            }
        } catch (Exception ex) {
            System.debug('Error removing account subscription: ' + ex.getMessage());
        }
        
        return false;
    }
}