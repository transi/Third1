public with sharing class queryClass {
  @AuraEnabled(
    cacheable=true
  ) //In this context, we are using wire services, so we need to cache our data
  public static List<SObject> getResultsFromQuery(
    String query,
    Integer ResultsPerPage,
    Integer pageNumber
  ) {
    Integer offset = (pageNumber - 1) * ResultsPerPage;
    query += ' LIMIT ' + ResultsPerPage + ' OFFSET ' + String.valueOf(offset); //We get a simple query, and we add a limit and an offset
    return Database.query(query);
  }
  @AuraEnabled(cacheable=true)
  public static List<String> getFieldsAndObjectNamesFromSoql(String query) {
    //We use this method to display all the fields on the data table
    query = query.toLowerCase(query);
    // We define the regex to get the name of the object
    Pattern objectPattern = Pattern.compile('from\\s+([\\w\\d_]+)\\s*');
    Matcher objectMatcher = objectPattern.matcher(query);
    String objectName = '';
    if (objectMatcher.find()) {
      objectName = objectMatcher.group(1);
    } else {
      throw new QueryException(
        'Can\'t find the object name for the query: ' + query
      );
    }
    // We do the same for the names of the fields
    Pattern fieldPattern = Pattern.compile(
      'select\\s+((\\w+\\s*,\\s*)*\\w+)\\s+from\\s+' + objectName + '\\s*'
    );
    Matcher fieldMatcher = fieldPattern.matcher(query);
    if (fieldMatcher.find()) {
      String fieldList = fieldMatcher.group(1);
      system.debug('test fieldList: ' + fieldList);
      List<String> fieldNames = fieldList.split('\\s*,\\s*');

      fieldNames.add(objectName);
      for (Integer i = 0; i < fieldNames.size(); i++) {
        fieldNames[i] = fieldNames[i].capitalize(); //If we don't set the first letters as uppercase, some differences may occur between the query results and this list, and the data table will not display properly
      }
      return fieldNames;
    } else {
      throw new QueryException(
        'Can\'t find the names of the fields for the query: ' + query
      );
    }
  }
  //This method will be useful to know when we have to deactivate some buttons, it only returns the size of the query with no limits
  @AuraEnabled(cacheable=true)
  public static Integer getTotalNumberOfResults(String query) {
    return Database.query(query).size();
  }
}
