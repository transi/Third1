public with sharing class oppRelatedAcc {
   

    @AuraEnabled(cacheable = true)
    public static List<Opportunity> getOppRecords( String id ){
        try {
                return [Select Id,Name, StageName, Amount, AccountId from Opportunity LIMIT 5]; 
                // where AccountId =:id

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled

    // public static string updateOppRecords(Object OppData)
    public static string updateOppRecords(Opportunity OppData)

    {
        
        update OppData;
        
        // List<Opportunity> oppsForUpdate = (List<Opportunity>) JSON.deserialize(
        //  JSON.serialize(OppData),
        //  List<Opportunity>.class);

        //  update oppsForUpdate;
        return 'Success: contacts updated successfully';
        // //update oppList;
        
    }
   
    }