public with sharing class UpsertRecordsHandler {
    @AuraEnabled
    //The method receives the object name from the LWC's picklist, and the uploaded CSV File Id
    public static String UpsertRecordsFromCSV(
      String sObjectName,
      String csvFileId
    ) {
      //We use the CSV File Id to query the uploaded document and its content
      String csvAsString = [
          SELECT Id, VersionData
          FROM ContentVersion
          WHERE ContentDocumentId = :csvFileId
        ][0]
        .VersionData.toString();
      //We define two lists: the first one is just the list of values as you would see it in Excel.
      //The second one is a list of all the indexes
      //We will increment on these two lists
      List<String> csvLines = csvAsString.split('\n');
      List<String> headers = csvLines[0].split(',');
      List<SObject> recordsToHandle = new List<SObject>();
      //Here we generalize the record's creation/updating: we create an instance of Schema.SObjectType,
      //and then we use the newSObject method
      //if the LWC was only for the Accounts, we would just use Account record = new Account()
      //But we can't here
      Schema.SObjectType objectType = Schema.getGlobalDescribe().get(sObjectName);
      //Two for loops: the first one is to increment in the records, and the second one is to increment in the different fields of the csv file
      for (Integer i = 1; i < csvLines.size(); i++) {
        SObject record = objectType.newSObject();
        List<String> values = csvLines[i].split(','); //We define a list of all the values of each record
        for (Integer j = 0; j < headers.size(); j++) {
          record.put(headers[j].trim(), values[j].trim()); //The field names and the values have the same indexes, we just do the match here on our record
        }
        recordsToHandle.add(record); //We add the record to the list, to bulkify the upsert
      }
      try {
        upsert recordsToHandle;
        return 'Success';
      } catch (Exception e) {
        return 'Error: ' + e.getMessage();
      }
    }
    //This method's role is to get a list of all the API names of the org and to give it to the LWC
    @AuraEnabled(cacheable=true)
    public static List<String> getObjectApiNames() {
      List<String> objectApiNames = new List<String>();
      for (Schema.SObjectType objectType : Schema.getGlobalDescribe().Values()) {
        //We increment in Schema.getGlobalDescribe().Values()
        objectApiNames.add(objectType.getDescribe().getName()); //We get the name for each object, and save it to a list
      }
      objectApiNames.sort(); //When we've treated all the objects, we sort the list, to get ordered values on the picklist
      return objectApiNames; //We return the list to the LWC
    }
  }