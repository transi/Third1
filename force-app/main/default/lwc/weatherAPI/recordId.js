import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getRecord } from "lightning/uiRecordApi";

//We import the getInfosFromApi Apex method
import getInfosFromApi from "@salesforce/apex/methodUtils.getInfosFromApi";

export default class WeatherComponent extends LightningElement {
  error; //We use it to handle errors when we try to get the weather data with the wire service
  //These two variables will store the actual exact position of the user, and will be reinjected on the apex method
  longitude;
  latitude;
  //These are the variables we want to display on the screen
  location;
  temperature;
  weatherConditions;
  weatherIcon;

  //We call the getInfosFromApi method with the latitude and longitude parameters, and if there is no error, we get back the weather data
  @wire(getInfosFromApi, { latitude: "$latitude", longitude: "$longitude" })
  wiredInfos({ error, data }) {
    //The data here is an object. So we just have to save the elements of the object on variables, and then display them to the screen
    if (data) {
      this.location = data.location;
      this.temperature = data.temperature;
      this.weatherConditions = data.weatherConditions;
      this.weatherIcon = data.weatherIcon;
    } else if (error) {
      this.error = error;
    }
    console.log('JSON.stringify... ' + JSON.stringify(data));
  }
  //When the page loads, we call getUserLocation
  renderedCallback() {
    this.getUserLocation();
  }

  //We get the actual geolocation of the current user
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // We get the Latitude and Longitude from Geolocation API, and save them to variables
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('JSON.stringify... ' + JSON.stringify(this));
      });
    }
  }
}