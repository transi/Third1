public class PotentialDuplicateComponentController {
    @AuraEnabled(cacheable=true)
    public static List<sObject> searchPotentialDuplicates(String objectApiName, Id recordId) {

        String SobjectApiName = objectApiName;
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(SobjectApiName).getDescribe().fields.getMap();

        List<String>apiNames =  new list<String>();
        List<String>duplicatefiled =  new list<String>();

        for(String apiName : fieldMap.keyset())
        {
            //if(fieldMap.get(apiName).getDescribe().isUpdateable()) {
            apiNames.add(apiName);
            //}
        }
        list<Id> idss = new List<id>();
        string allFieldString = string.join(apiNames,',');

        String query = 'SELECT ' + allFieldString + ' FROM ' + SobjectApiName + ' WHERE Id =\'' + recordId +'\'';
        List<sObject> sObjectListForDupCheck = Database.query(query);

        Datacloud.FindDuplicatesResult[] findDupeResults = Datacloud.FindDuplicates.findDuplicates(sObjectListForDupCheck);
        system.debug('7777  '+findDupeResults);
        List<sObject> potentialDuplicates = new List<sObject>();
        List<sObject> potentialDuplicat = new List<sObject>();
        List<sObject> potentialDuplicatt = new List<sObject>();
        for (Datacloud.FindDuplicatesResult findDupeResult : findDupeResults) {
             system.debug('1  '+findDupeResults);
            for (Datacloud.DuplicateResult dupeResult : findDupeResult.getDuplicateResults()) {
                 system.debug('2  '+findDupeResults);
                for (Datacloud.MatchResult matchResult : dupeResult.getMatchResults()) {
                     system.debug('3  '+findDupeResults);
                    for (Datacloud.MatchRecord matchRecord : matchResult.getMatchRecords()) {
                        if(SobjectApiName.contains('__c')){
                          for(Datacloud.FieldDiff ass :matchRecord.getFieldDiffs()){
                            system.debug('6  '+ass.getName());
                            duplicatefiled.add(ass.getName());
                              potentialDuplicat.add((sObject)matchRecord.getRecord());
                        }                        
                        }else{
                           potentialDuplicatt.add((sObject)matchRecord.getRecord()); 
                           system.debug('7  '+potentialDuplicatt);
                        }
                                                
                    }
                    
                }
            } 
        }
        if(potentialDuplicatt.isEmpty()){
                    idss.add(recordId);
        for(sObject aa :potentialDuplicat){
            idss.add(aa.id); //containing all duplicate and original data ID
        }
         system.debug('8  '+duplicatefiled);
        string allFields = string.join(duplicatefiled,',');
            system.debug('9  '+allFields);
        String querys = 'SELECT ' + allFields + ' FROM ' + SobjectApiName + ' WHERE Id IN:idss ';
        List<sObject> sObjectListForDupChecks = Database.query(querys);
        for(sObject aaa :sObjectListForDupChecks){
           potentialDuplicates.add(aaa); 
        }
        }

        if(!potentialDuplicatt.isEmpty()){
            potentialDuplicatt.add(sObjectListForDupCheck[0]); 
        }
         
        system.debug('e '+potentialDuplicates);
        if(!potentialDuplicatt.isEmpty()){
             return potentialDuplicatt;
        }else{
             return potentialDuplicates;
        }
       
    }
    
        
    @AuraEnabled(cacheable=true)
     public static List<String> compareSObjects(SObject sobject1, SObject sobject2) {
        List<String> differentFields = new List<String>();
        Map<String, SObjectField> fields1 = sobject1.getSObjectType().getDescribe().fields.getMap();
        Map<String, SObjectField> fields2 = sobject2.getSObjectType().getDescribe().fields.getMap();
        
        for (String fieldName : fields1.keySet()) {
            if (!fields2.containsKey(fieldName)) {
                continue;
            }
            
            Object value1 = sobject1.get(fieldName);
            Object value2 = sobject2.get(fieldName);
            
            if (value1 != value2 && (value1 == null || !value1.equals(value2))) {
                differentFields.add(fieldName);
            }
        }
        
        return differentFields;
    }
        
    @AuraEnabled(cacheable=true)
   public static void mergeSObjects(SObject master, List<SObject> toMerge) {
        Map<String, SObjectField> masterFields = master.getSObjectType().getDescribe().fields.getMap();
        
        for (SObject mergeObject : toMerge) {
            for (String fieldName : mergeObject.getSObjectType().getDescribe().fields.getMap().keySet()) {
                if (!masterFields.containsKey(fieldName)) {
                    continue;
                }
                
                Object value = mergeObject.get(fieldName);
                master.put(fieldName, value);
            }
        }
      
    }
}