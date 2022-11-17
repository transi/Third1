public inherited sharing class AccountTriggerHandler {
    public AccountTriggerHandler() {

    }
        
    public void BeforeInsert(List<Account> acclist){
        for(Account acc:acclist){
            system.debug('Inside AccountTriggerHandler BeforeInsert acc' + acc);
            if(acc.NumberOfEmployees==NULL){
                acc.NumberOfEmployees=1;
            }
            system.debug('Inside AccountTriggerHandler BeforeInsert after acc' + acc);
        }
    }

    public void AfterInsert(List<Account> acclist){
        List<Contact> contactlist = new List<Contact>();
        for(account acc:acclist){
            system.debug('Inside AccountTriggerHandler AfterInsert acc' + acc);
            for (integer i=0;i<acc.NumberOfEmployees;i++) {
                Contact con = new Contact();
                con.AccountId = acc.Id;
                con.LastName = acc.Name + 'i';
                contactlist.add(con);
            }
        }
        system.debug('Inside AccountTriggerHandler AfterInsert contactlist' + contactlist);
        if(contactlist.size()>0){
            insert contactlist;
        }
    }
}
