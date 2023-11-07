public with sharing class uploadFile {
  @AuraEnabled
  public static String uploadFile(
    String parentId,
    String documentId,
    String fileName
  ) {
    try {
      System.debug('parentId : ' + parentId);
      System.debug('documentId : ' + documentId);
      System.debug('fileName : ' + fileName);
      // Query the ContentVersion record
      ContentVersion cv = [
        SELECT Id, Title
        FROM ContentVersion
        WHERE ContentDocumentId = :documentId
        LIMIT 1
      ];

      // Update the Title field
      cv.Title = fileName;

      // Perform the update
      update cv;

      //Create ContentDocumentLink
      ContentDocumentLink cdl = new ContentDocumentLink();
      cdl.LinkedEntityId = parentId;
      cdl.ContentDocumentId = documentId;
      cdl.shareType = 'V';
      insert cdl;

      return parentId;
    } catch (Exception e) {
      System.debug('error in FileUploadHandler.uploadFile');
      System.debug('error line number : ' + e.getLineNumber());
      System.debug('error error message : ' + e.getMessage());
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static String deleteUploadedFiles(List<String> lstDocumentId) {
    try {
      System.debug('docs id : ' + lstDocumentId);
      List<ContentDocument> lstDocuments = [
        SELECT Id, Title
        FROM ContentDocument
        WHERE Id IN :lstDocumentId
      ];
      delete lstDocuments;

      return 'success';
    } catch (Exception e) {
      System.debug('error in FileUploadHandler.deleteUploadedFiles');
      System.debug('error line number : ' + e.getLineNumber());
      System.debug('error message : ' + e.getMessage());
      throw new AuraHandledException(e.getMessage());
    }
  }
}
