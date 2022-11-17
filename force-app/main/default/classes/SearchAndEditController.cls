public  class SearchAndEditController {
    public String name{get;set;}
    public Boolean searched{get;set;}
    public List<Account> accounts{get;set;}
    public SearchAndEditController(){
        searched = false;
    }
    public Pagereference executeSearch(){
        String searchStr = '%' + name + '%';
        accounts = [select id,name,type,rating from Account where name like : searchStr];
        searched = true;
        return null;
    }
}