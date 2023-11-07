public with sharing class PermissionSetController {

    @AuraEnabled(cacheable=true)
    public static List<PermissionSetInfo> getPermissionSets() {
        List<PermissionSet> permissionSets = [SELECT Id, Name FROM PermissionSet ORDER BY Name];
        return convertToPermissionSetInfo(permissionSets);
    }
    @AuraEnabled
    public static Map<String, List<PermissionSetPermissionInfo>> getPermissions(String permissionSetId) {
        Map<String, List<PermissionSetPermissionInfo>> objectPermissionsMap = new Map<String, List<PermissionSetPermissionInfo>>();
    
        // Get the related ObjectPermissions for the given PermissionSet Id
        List<ObjectPermissions> objectPermissions = [
            SELECT ParentId, Parent.Name, Parent.Label, SObjectType, PermissionsCreate, PermissionsDelete,
                PermissionsModifyAllRecords, PermissionsEdit, PermissionsRead, PermissionsViewAllRecords
            FROM ObjectPermissions
            WHERE ParentId = :permissionSetId
        ];
        // Group the permissions by SObjectType (object name)
        for (ObjectPermissions objPerm : objectPermissions) {
            String objectName = objPerm.SObjectType;
            if (!objectPermissionsMap.containsKey(objectName)) {
                objectPermissionsMap.put(objectName, new List<PermissionSetPermissionInfo>());
            }
    
            PermissionSetPermissionInfo permInfo = new PermissionSetPermissionInfo();
            permInfo.ParentName = objPerm.Parent.Name;
            permInfo.ParentLabel = objPerm.Parent.Label;
            permInfo.SObjectType = objectName;
            permInfo.PermissionsCreate = objPerm.PermissionsCreate;
            permInfo.PermissionsEdit = objPerm.PermissionsEdit;
            permInfo.PermissionsRead = objPerm.PermissionsRead;
            permInfo.PermissionsDelete = objPerm.PermissionsDelete;
            permInfo.PermissionsViewlAll = objPerm.PermissionsViewAllRecords;
            permInfo.PermissionsModifyAll = objPerm.PermissionsModifyAllRecords;
            objectPermissionsMap.get(objectName).add(permInfo);
            }
    
        return objectPermissionsMap;
    }
    public static List<PermissionSetInfo> convertToPermissionSetInfo(List<PermissionSet> permissionSets) {
        List<PermissionSetInfo> permissionSetInfoList = new List<PermissionSetInfo>();
        for (PermissionSet ps : permissionSets) {
            PermissionSetInfo psi = new PermissionSetInfo();
            psi.Id = ps.Id;
            psi.Name = ps.Name;
            permissionSetInfoList.add(psi);
        }
        return permissionSetInfoList;
    }
    public class PermissionSetInfo {
        @AuraEnabled public Id Id;
        @AuraEnabled public String Name;
    }
    public class PermissionSetPermissionInfo {
        @AuraEnabled public String ParentName;
        @AuraEnabled public String ParentLabel;
        @AuraEnabled public String SObjectType;
        @AuraEnabled public Boolean PermissionsEdit;
        @AuraEnabled public Boolean PermissionsCreate;
        @AuraEnabled public Boolean PermissionsRead;
        @AuraEnabled public Boolean PermissionsDelete;
        @AuraEnabled public Boolean PermissionsViewlAll;
        @AuraEnabled public Boolean PermissionsModifyAll;
    }
}