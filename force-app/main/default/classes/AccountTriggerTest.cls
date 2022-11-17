@isTest
public class AccountTriggerTest {
    @isTest
    private static void AccountInsertTest() {
    Account acc = new Account();
    acc.Name='TestAcc1';

    Test.startTest();
    insert acc;
    Test.stopTest();

    Account accRecord = [select id,NumberOfEmployees from Account where id=:acc.Id];
    System.assertEquals(1, accRecord.NumberOfEmployees);
    List<contact> conlist = [select id, Name from Contact where AccountId=:acc.Id];
    System.assert(conlist.size()>0);
    }
}