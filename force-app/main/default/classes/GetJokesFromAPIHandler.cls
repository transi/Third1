public with sharing class GetJokesFromAPIHandler {
    public GetJokesFromAPIHandler() {

    }
}

// public with sharing class GetJokesFromAPIHandler implements Schedulable {
//   @future(callout=true)
//   public static void callAPI() {
//     //For this callout we only need the token. We've stored it inside a Joke_API_Integration__mdt custom metadata type
//     String key = String.valueOf(
//       Joke_API_Integration__mdt.getInstance('API_Token').get('Token__c')
//     );
//     //We define the number of jokes we want from the callout. For us, it's 1, but it could be changed
//     Integer NumberOfResults = 1;

//     //We define a HTTP request
//     Http http = new Http();
//     HttpRequest request = new HttpRequest();

//     //We define the endpoint. It will take as a parameter the number of results
//     request.setEndpoint(
//       'https://api.api-ninjas.com/v1/jokes?limit=' + NumberOfResults
//     );
//     //We add the token inside the header
//     request.setHeader('X-Api-Key', key);

//     //We don't have jokes right now, we need one. We use a 'GET' method
//     request.setMethod('GET');

//     //We send the request
//     HttpResponse response = http.send(request);

//     // If the request is successful, we parse the JSON response
//     if (response.getStatusCode() == 200) {
//       //We got this kind of response: [{"joke": "My Joke"}]. So, we need to transform it to only get "My joke" as a String
//       List<Object> input = (List<Object>) JSON.deserializeUntyped(
//         response.getBody()
//       );
//       String joke = (String) ((Map<String, Object>) input.get(0)).get('joke');
//       //When it's done, we call sendJokeNotification, which will create a custom notification
//       sendJokeNotification(joke);
//     } else {
//       system.debug('failure');
//     }
//   }
//   //We use the execute method of the Schedulable interface to call the Joke API
//   public void execute(SchedulableContext SC) {
//     callAPI();
//   }
//   public static void sendJokeNotification(String joke) {
//     //We get a list of the
//     User userWhoLikesToLaugh = [
//       SELECT Id
//       FROM User
//       WHERE Name = 'Sélim Hamidou'
//       LIMIT 1
//     ];

//     // We get the notification type Id
//     CustomNotificationType notificationType = [
//       SELECT Id, DeveloperName
//       FROM CustomNotificationType
//       WHERE DeveloperName = 'Joke_Notification'
//     ];

//     // Create a new custom notification
//     Messaging.CustomNotification notification = new Messaging.CustomNotification();

//     // We call insertNewJokeForMyOneManShow and get the number of records inside the Joke_For_My_One_Man_Show__c object
//     Integer numberOfJokesForTheOneManShow = insertNewJokeForMyOneManShow(joke);
//     //We add the joke to the notifications
//     notification.setTitle(
//       'Hey buddy, this is the joke N°' +
//       numberOfJokesForTheOneManShow +
//       ' for our show tonight. Don\'t disappoint me.'
//     );
//     notification.setBody(joke);

//     // We set the notification type Id with the value we got from the previous SOQL
//     notification.setNotificationTypeId(notificationType.Id);
//     //We define the redirection link. We have to choose between the setTargetPageRef and the setTargetId method.
//     //We chose the first one because we prefer to redirect to a list view instead of a specific record, but it's up to you
//     //But you have to know that setting a value is mandatory here
//     notification.setTargetPageRef(
//       '{"type": "standard__objectPage","attributes": {"objectApiName": "Joke_For_My_One_Man_Show__c","actionName": "list"},"state":{"filterName":"00B0900000R6wKNEAZ"}}'
//     );

//     // When everything is set, we send the notification. If we cannot, we catch the error and display it on the debug logs
//     try {
//       notification.send(new Set<String>{ userWhoLikesToLaugh.Id });
//     } catch (Exception e) {
//       System.debug('Problem sending notification: ' + e.getMessage());
//     }
//   }
//   //On this method we receive the joke from the API
//   //We save it on a record
//   //We count the number of records we have on the Joke_For_My_One_Man_Show__c object(that we created sooner), and we will reuse it on the notification body
//   public static Integer insertNewJokeForMyOneManShow(String joke) {
//     List<Joke_For_My_One_Man_Show__c> listOfNewJokes = new List<Joke_For_My_One_Man_Show__c>();
//     Joke_For_My_One_Man_Show__c newJoke = new Joke_For_My_One_Man_Show__c(
//       Name = 'Joke ' + Datetime.Now(),
//       Joke__c = joke
//     );
//     listOfNewJokes.add(newJoke);
//     insert listOfNewJokes;
//     return [SELECT COUNT() FROM Joke_For_My_One_Man_Show__c];
//   }
// }