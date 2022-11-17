trigger AccountTrigger on Account (before insert, before update, after insert) {
    if (trigger.isInsert) {
        AccountTriggerHandler handler = new AccountTriggerHandler();
        if(trigger.isBefore){
            handler.BeforeInsert(trigger.new);
        }
        if(trigger.isAfter){
            handler.AfterInsert(trigger.new);
        }
    } 
    else if(trigger.isUpdate) {
        
    }
}