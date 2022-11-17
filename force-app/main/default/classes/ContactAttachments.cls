public with sharing class ContactAttachments {
    public Attachment newAtt{get;set;}
    public string recordid;
    public string selectedAttch{get;set;}
    public ContactAttachments(Apexpages.StandardController controller) {
        recordid = controller.getId();
        newAtt = new Attachment();
    }

    public PageReference Upload(){
        if(string.isBlank(newAtt.Name)){
            Apexpages.addMessage(new Apexpages.Message(apexpages.Severity.Error, 'Please select file to upload.'));
            return null;
        }
        newAtt.ParentId=recordid;
        insert newAtt;
        newAtt = new Attachment();
        PageReference result = Apexpages.currentPage();
        result.setRedirect(true);
        return result;
    }

    public PageReference deleteAttachment(){
        if(String.isNotBlank(selectedAttch)){
            List<Attachment> attchToDel = [SELECT ID FROM Attachment WHERE Id=:selectedAttch];
            if(attchToDel.size()>0){
                delete attchToDel;
            }
        }
        PageReference result  = Apexpages.currentPage();
        result.setRedirect(true);
        return result;
    }
}
