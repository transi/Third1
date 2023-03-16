public with sharing class LightningDatatableController {

    private static List<Schema.FieldSetMember> getFieldSet(String ObjectName, String fieldSetName) {
    
    
            Schema.DescribeSObjectResult DescribeSObjectResultObj = Schema.getGlobalDescribe().get(ObjectName).getDescribe();
            List<Schema.FieldSetMember> fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName).getFields();
    
    
            return fieldSetObj;
    }  

    @AuraEnabled
    public static String getFields(String ObjectName, String fieldSetName) {
       
        List<Schema.FieldSetMember> fieldSetObj = getFieldSet(ObjectName,fieldSetName);


        return JSON.serialize(fieldSetObj);
    } 

    @AuraEnabled
    public static List<Opportunity> getRenewalOpps(String ObjectName, String fieldSetName) {
        String fields = '';
       
        for(Schema.FieldSetMember field : getFieldSet(ObjectName,fieldSetName)) {
            fields += field.getFieldPath() + ', ';
        }
        String query ='SELECT '+ fields + 'Id FROM Opportunity LIMIT 10';


        return Database.query(query);
    }
    
}