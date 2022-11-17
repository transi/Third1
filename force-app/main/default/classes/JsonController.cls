public with sharing class JsonController {
    @AuraEnabled
    public static string saveJsonAsFile(Object obj){
        try {
            ContentVersion ContVerFile = new ContentVersion();
            ContVerFile.VersionData = Blob.valueOf(JSON.serialize(obj));
            ContVerFile.Title = 'JSON From LWC'; 
            ContVerFile.ContentLocation= 's';
            ContVerFile.PathOnClient='JSON From LWC.txt';
            ContVerFile.FirstPublishLocationId = userinfo.getUserid();
            insert ContVerFile;
            return ContVerFile.Id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}