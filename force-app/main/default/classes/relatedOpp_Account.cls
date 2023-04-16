public with sharing class relatedOpp_Account {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> displayRelatedOpp_Account(string accId) {
        List<Map<String, Object>> oppList = new List<Map<String, Object>>();
        List<Opportunity> opps = [SELECT Id, Name, StageName, Amount FROM Opportunity 
        // WHERE AccountId = :accId
        ];
        for (Opportunity opp : opps) {
            Map<String, Object> oppMap = new Map<String, Object>();
            oppMap.put('Id', opp.Id);
            oppMap.put('Name', opp.Name);
            oppMap.put('StageName', opp.StageName);
            oppMap.put('Amount', opp.Amount);
            oppList.add(oppMap);
        }
        return oppList;
    }
}

