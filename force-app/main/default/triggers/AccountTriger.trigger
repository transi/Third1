trigger AccountTriger on Account (before insert, before update) {
    if (trigger.isInsert) {
        
    } else if(trigger.isUpdate) {
        
    }
}