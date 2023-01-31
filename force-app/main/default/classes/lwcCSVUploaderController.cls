public class lwcCSVUploaderController {

    @AuraEnabled
    public static List<Lead> saveFile(String base64Data) {
        String data    = JSON.deserializeUntyped(base64Data).toString();
        Integer TotalCreated = 0;
        list<Lead> lstCCToUpsert = new list<Lead>();
        list<String> lstCSVLines = data.split('\n');
        list<Lead> dupeList = [Select ID, Email, FirstName, LastName from Lead where Email !=null];
    
        for(Integer i = 1; i < lstCSVLines.size(); i++){
            Lead ld = new Lead();
            String csvLine = lstCSVLines[i];
            String prevLine = csvLine;
            Integer startIndex;
            Integer endIndex;
            
            while(csvLine.indexOf('"') > -1){
                if(startIndex == null){
                    startIndex = csvLine.indexOf('"');
                    csvLine = csvLine.substring(0, startIndex) + ':quotes:' + csvLine.substring(startIndex+1, csvLine.length());
                }else{
                    if(endIndex == null){
                        endIndex = csvLine.indexOf('"');
                        csvLine = csvLine.substring(0, endIndex) + ':quotes:' + csvLine.substring(endIndex+1, csvLine.length());
                    }
                }
                
                if(startIndex != null && endIndex != null){
                    String sub = csvLine.substring(startIndex, endIndex);
                    sub = sub.replaceAll(',', ':comma:');
                    csvLine = csvLine.substring(0, startIndex) + sub + csvLine.substring(endIndex, csvLine.length());
                    startIndex = null;
                    endIndex = null;
                }
            }
            
            List<String> csvRowData = new List<String>();
    
            for(String column : csvLine.split(',')){
                column = column.replaceAll(':quotes:', '').replaceAll(':comma:', ',');
                csvRowData.add(column);
            }
    
            ld.FirstName                      = csvRowData[0];
            ld.LastName                       = csvRowData[1];
            ld.Title                          = csvRowData[2];
            ld.Company                        = csvRowData[3];
            ld.Email                          = csvRowData[4];
            ld.Street                         = csvRowData[5];
            ld.City                           = csvRowData[6];
            ld.State                          = csvRowData[7];
            ld.PostalCode                     = csvRowData[8];
            ld.Industry                       = csvRowData[9];
            ld.Phone                          = csvRowData[10];
            ld.LeadSource                     = csvRowData[11];
            ld.Ownerid                        = '00G79000000YwYyEAK';
            
                // for(Lead newLeads !:dupeList){-
                //     lstCCToUpsert.add(ld);
    
        }
    
            //upsert lstCCToUpsert;
    
        return [Select Id, 
                       FirstName, 
                       LastName, 
                       Company, 
                       Title, 
                       Email,
                       Street, 
                       City, 
                       State, 
                       PostalCode, 
                       Industry, 
                       Phone
                    From Lead 
                    Where Id in :lstCCToUpsert
                ];
    }
    }