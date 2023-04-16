public class RecordDataController {
     @AuraEnabled(cacheable=true)
     public static List <Lead> getDeletedLeads(String leadName, String leadEmail) {
          List <Lead> deletedLeads = [SELECT id, Name, Email 
                                      FROM Lead 
                                    //   WHERE IsDeleted = true
                                    //         AND Name =: leadName
                                    //         AND Email =: leadEmail
                                      LIMIT 5 ALL ROWS ];
          return deletedLeads;
     }
}