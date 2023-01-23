public class mperativeDemo {
    @AuraEnabled
    public static list<contact> getcontacts(){
        list<contact> getlist=[select id,name from contact];
     
        return getlist;
    }

}