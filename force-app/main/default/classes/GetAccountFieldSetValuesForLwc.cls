public class GetAccountFieldSetValuesForLwc {
    // public static List<Schema.FieldSetMember> getFields() {
    //     return SObjectType.Account.FieldSets.AccountField.getFields();
    // }
    
    @AuraEnabled(cacheable=true)
    public static Account getAccountList(id accid) {
        // String query = 'SELECT ';
        // for(Schema.FieldSetMember fs : GetAccountFieldSetValuesForLwc.getFields()) {
        //     query += fs.getFieldPath() + ', ';
        // }
        // query += 'Id FROM Account WHERE ID=\''+accid+'\'';
        // System.debug(query);
        // return Database.query(query);
         // idvalue = '%'+ accid +'%';
         System.debug('accountid'+accid);
         list<Account> relatedlist = [select id,Name from Account];
         System.debug('relatedlist=='+relatedlist);
         return relatedlist[0]; 


    }

     @AuraEnabled(cacheable=true)
     public static list<Account> getsrelatedrecordstoAccount(list<Id> accid){
         // idvalue = '%'+ accid +'%';
         System.debug('accountid'+accid);
         list<Account> relatedlist = [select id,Name from Account];
         System.debug('relatedlist=='+relatedlist);
         return relatedlist; 
    } 
    
    @AuraEnabled
    public static list<Account>  geRelatedRecordtoDelete(Id rId){
        ID recordid = rId;
        System.debug('recordid--------->>'+recordid);
        List<Account> recordstodelete = [select id,Name from Account ];
        System.debug('relatedlist=='+recordstodelete);
        delete recordstodelete; 
        List<Account> relatedlist = [select id,Name from Account ];
        return relatedlist; 
    }

    @AuraEnabled
    public static ID getRecordsToCreate(String aid,string rname){
        System.debug('aid=='+aid);
        System.debug('rrname=='+rname);
        Account  rr = new Account( );
        rr.Name= rname;
        insert rr;
        return rr.ID;
    } 
}