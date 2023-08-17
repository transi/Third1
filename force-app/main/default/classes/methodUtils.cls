public with sharing class methodUtils {
  //This method is called with the wire service(cacheable=true).
  //When the location(latitude and/or longitude) changes, the method is called
  @AuraEnabled(cacheable=true)
  public static Map<String, String> getInfosFromApi(
    String latitude,
    String longitude
  ) {
    //We define a map that will store all the weather information we need(at this time: location, temperature, weather condition, weather icon)
    Map<String, String> weatherFactorsMap = new Map<String, String>();

    //We define an HTTP request
    Http http = new Http();
    HttpRequest request = new HttpRequest();

    //We call the custom metadata type we created sooner(Key_Weather_API__mdt), to get the actual token, and to connect to the API
    String key = String.valueOf(
      Key_Weather_API__mdt.getInstance('API_Key').get('Key__c')
    );

    //Defining the endpoint, with the two parameters of the method(latitude and longitude)
    request.setEndpoint(
      'https://api.weatherapi.com/v1/current.json?key=' +
        key +
        '&q=' +
        latitude +
        ',' +
        longitude +
        '&aqi=no'
    );
    //We only need to get some data, so the "GET" method is the most adequate one here
    request.setMethod('GET');

    //We send the request
    HttpResponse response = http.send(request);
    // If the request is successful, we parse the JSON response
    if (response.getStatusCode() == 200) {
      // We deserialize the JSON string into maps, to access the fields we want
      Map<String, Object> deserializedMap = (Map<String, Object>) JSON.deserializeUntyped(
        response.getBody()
      );
      Map<String, Object> allFields = (Map<String, Object>) deserializedMap.get(
        'current'
      );
      Map<String, Object> conditionFields = (Map<String, Object>) allFields.get(
        'condition'
      );
      Map<String, Object> locationFields = (Map<String, Object>) deserializedMap.get(
        'location'
      );
      String location =
        String.valueOf(locationFields.get('name')) +
        ', ' +
        String.valueOf(locationFields.get('country'));
      String temperature = String.valueOf(allFields.get('temp_c'));
      String weatherConditions = String.valueOf(conditionFields.get('text'));
      String weatherIcon = String.valueOf(conditionFields.get('icon'));

      //When we get the fields, we save them to the weatherFactorsMap...
      weatherFactorsMap.put('location', location);
      weatherFactorsMap.put('temperature', temperature);
      weatherFactorsMap.put('weatherConditions', weatherConditions);
      weatherFactorsMap.put('weatherIcon', weatherIcon);
    }
    //...And we return them to the LWC
    System.debug(weatherFactorsMap);
    return weatherFactorsMap;
  }
}
