public with sharing class SearchController {

    @AuraEnabled(Cacheable = true)
    public static List<Product2> retriveProducts(String strProdName) {
        strProdName = '%' + strProdName + '%';
        // try {
        List<Product2> lstProd = [SELECT  Id, Name, ProductCode FROM Product2 WHERE Name LIKE :strProdName WITH SECURITY_ENFORCED];
        //    }
        // catch(System.QueryException qe) {
        // System.debug(qe.getMessage());
        // }
        return lstProd; 
    }
}