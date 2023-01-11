public with sharing class fileCreationController {
    @AuraEnabled
    public static void linkExistingFile(String parentId) {
        ContentVersion cv = new ContentVersion(
            Title='SampleTitle', 
            PathOnClient ='SampleTitle.jpg',
            VersionData = Blob.valueOf('Unit Test ContentVersion Body to be insert in test class for testing the'), 
            FirstPublishLocationId = parentId
        );
        insert cv;
    }
}