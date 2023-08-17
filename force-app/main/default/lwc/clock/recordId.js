import { LightningElement, api } from 'lwc';

export default class AnalogClock extends LightningElement {
    @api contactAddress;

    connectedCallback() {
        this.updateClock();
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    renderedCallback() {
        this.updateClock();
    }

    get hours() {
        // Generate hour numbers and their positions
        const hourNumbers = [];
        for (let i = 1; i <= 12; i++) {
            const angle = (i * 360 / 12) - 90;
            const cx = 100 + 75 * Math.cos(angle * Math.PI / 180);
            const cy = 100 + 75 * Math.sin(angle * Math.PI / 180);
            hourNumbers.push({ value: i, cx, cy });
        }
        return hourNumbers;
        }

    get dots() {
        // Generate dots for the minutes and their positions
        const minuteDots = [];
        for (let i = 0; i < 60; i++) {
            if (i % 5 !== 0) {
                const angle = (i * 360 / 60) - 90;
                const cx = 100 + 85 * Math.cos(angle * Math.PI / 180);
                const cy = 100 + 85 * Math.sin(angle * Math.PI / 180);
                minuteDots.push({ cx, cy });
            }
        }
        return minuteDots;
        }

    updateClock() {
        const now = new Date();

        // Adjust the time based on the contact's address timezone or location information
        // You can use a library like Luxon or Moment.js to handle time zone conversions

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Calculate angles for the clock hands
        const hourAngle = (hours % 12 + minutes / 60) * 360 / 12;
        const minuteAngle = (minutes + seconds / 60) * 360 / 60;
        const secondAngle = seconds * 360 / 60;

        // Apply the rotation to the clock hands
        this.setHandRotation('hour-hand', hourAngle);
        this.setHandRotation('minute-hand', minuteAngle);
        this.setHandRotation('second-hand', secondAngle);
    }

    setHandRotation(handClass, angle) {
        const handElement = this.template.querySelector('.' + handClass);
        if (handElement) {
            handElement.style.transform = `rotate(${angle}deg)`;
            }
        }
    }

    // async getTimezone() {
    //     try {
    //       const geocodingApiKey = 'YOUR_GOOGLE_GEOCODING_API_KEY';
    //       const timezoneApiKey = 'YOUR_GOOGLE_TIMEZONE_API_KEY';
    
    //       // Step 1: Get coordinates (latitude and longitude) from the address using the Geocoding API
    //       const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //         this.address
    //       )}&key=${geocodingApiKey}`;
    
    //       const geocodingResponse = await fetch(geocodingUrl);
    //       const geocodingData = await geocodingResponse.json();
    
    //       if (geocodingData.results.length > 0) {
    //         const { lat, lng } = geocodingData.results[0].geometry.location;
    
    //         // Step 2: Get timezone information using the Time Zone API
    //         const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(
    //           Date.now() / 1000
    //         )}&key=${timezoneApiKey}`;
    
    //         const timezoneResponse = await fetch(timezoneUrl);
    //         const timezoneData = await timezoneResponse.json();
    
    //         if (timezoneData.timeZoneId) {
    //           // Step 3: Use Luxon to handle timezone conversions
    //           this.timezone = timezoneData.timeZoneId;
    //           // You can use the timezone with Luxon to convert dates and times as needed.
    //         } else {
    //           this.timezone = 'Timezone data not available';
    //         }
    //       } else {
    //         this.timezone = 'Invalid address';
    //       }
    //     } catch (error) {
    //       this.timezone = 'Error fetching timezone';
    //       console.error(error);
    //     }
    //   }
    // view rawgetTimezone.js hosted with ❤ by GitHub
    // Once you get the timezone, get the time:
    
    // function getCurrentTimeInTimezone(timezone) {
    //   const now = new Date();
    //   const options = { timeZone: timezone, hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    //   const formatter = new Intl.DateTimeFormat('en-US', options);
    //   const parts = formatter.formatToParts(now);
    
    //   // Extract the time components and format the time string
    //   const hour = parts.find(part => part.type === 'hour').value;
    //   const minute = parts.find(part => part.type === 'minute').value;
    //   const second = parts.find(part => part.type === 'second').value;
    
    //   const currentTimeInTimezone = `${hour}:${minute}:${second}`;
    
    //   return currentTimeInTimezone;
    // }
    
    // const timezone = 'America/New_York'; // Replace this with the desired timezone
    // const currentTimeInTimezone = getCurrentTimeInTimezone(timezone);
    // console.log(currentTimeInTimezone); // Output will be the current time in the specified timezone (e.g., "17:30:45")
    // view rawtimezoneTime.js hosted with ❤ by GitHub