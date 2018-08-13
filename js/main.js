// Local weather App - freecodecamp front end project
( function(){
    var app = {
        httpCon : false,
        dataArr:[],
        daysInWeek:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      }
   //week day and current time
    const date = new Date();
    let minutes = date.getMinutes()>9?date.getMinutes() : "0"+date.getMinutes();
    let timePeriod = date.getHours()<12?'am':'pm;';
    const today = app.daysInWeek[date.getDay()];
    const currentTime =date.getHours() + ":" + minutes +" "+ timePeriod;

    //city and current time
    let city = document.getElementById("city");
    let time = document.getElementById("local-time");

    //weather condition
    let weatherDescription =document.getElementById("description");
    let weatherIcon = document.getElementById("icon");

    //temperature and other data
    let tempElement = document.getElementById('temp');
    let tempHighElement = document.getElementById('temp-high');
    let tempLowElement = document.getElementById('temp-low');
    let humidity = document.getElementById('humidity');
    let pressure = document.getElementById('pressure');

    //temp celcius fahrenheit buttons
    let tempUnitCelcius = document.getElementById('temp-unit-cel');
    let tempUnitFahren = document.getElementById('temp-unit-fahren');

    // temperature units toggle buttons    
    tempUnitCelcius.addEventListener("click",(e)=>{
        e.preventDefault();
        e.target.style.background = '#a2c5ac';
        tempUnitFahren.style.color = '#a2c5ac';
        tempUnitCelcius.style.color = '#44394f';
        tempUnitFahren.style.background = '#ffffff';
        app.tempUnitConverter("C")
    });
   tempUnitFahren.addEventListener("click",(e)=>{
       e.preventDefault();
       e.target.style.background = '#a2c5ac';
       tempUnitCelcius.style.color= '#a2c5ac';
       tempUnitFahren.style.color = "#44394f";
      tempUnitCelcius.style.background = "#ffffff";
      app.tempUnitConverter("F");
   });

     //http connection
    app.xmlHttpConnection = function(){
            if(window.XMLHttpRequest){
               this.httpCon = new XMLHttpRequest()
            }else {
                if(window.ActiveXObject){
                    this.httpCon = new ActiveXObject('MSXML2.XMLHTTP.3.0');
                }
            }
            return this.httpCon;
        }
        //get user location using HTML5 geolocation API
    app.getUserLocation = function(){
        if(!navigator.geolocation){
            alert("Failed to get your Location");
        }
        else{
            const userLocation = navigator.geolocation.getCurrentPosition(this.userLocationSuccess,this.userLocationError);
        }        
    }
    //success callback for geolocation in app.getUserLocation()
    app.userLocationSuccess = function(location){        
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;
        //const latitude = 28.7041;
        //const longitude = 77.1025;
        app.getWeatherForecast(longitude,latitude);
         
    }
    //get weather data from fcc-weather-api
    app.getWeatherForecast = function(lon,lat){        
        let connection = this.xmlHttpConnection();
        connection.open("GET",`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`);
        connection.onreadystatechange= function(data){
             if(this.status == 200 && this.readyState == 4){
                 const data = JSON.parse(this.responseText);
                 app.dataArr.push(data);
                 app.updateWeatherForecast(data);
                 // hide loading wheel when data is ready and display weather data
                 document.getElementsByClassName('lds-ring')[0].style.display ="none";
                 document.getElementsByClassName('weather-data')[0].style.display='flex'; 
             }
        };
        connection.send(null);         
    }
    //display weather data on page
    app.updateWeatherForecast = function(data){
       
            city.textContent =data.name + ", " + data.sys.country;
            time.textContent = today + ", " + currentTime; 
            description.textContent = data.weather[0].description;
            weatherIcon.setAttribute("src",data.weather[0].icon);
            pressure.textContent = data.main.pressure;
            humidity.textContent = data.main.humidity; 
            tempElement.textContent= Math.round(data.main.temp); 
            tempHighElement.textContent = Math.round(data.main.temp_max) +" ° C";
            tempLowElement.textContent = Math.round(data.main.temp_min) +" ° C";
    }
    
   
    app.tempUnitConverter = function(unit){
        let tempInCel = app.dataArr[0].main.temp;
        let tempHigh = app.dataArr[0].main.temp_max;
        let tempLow = app.dataArr[0].main.temp_min;
        let tempInCelArr =[tempInCel,tempHigh,tempLow];
        let tempInFarArr = tempInCelArr.map( (item)=> Math.round((item * (9/5)) + 32));
        if(unit === "C"){
          
            tempElement.textContent= Math.round(tempInCel); 
            tempHighElement.textContent =  Math.round(tempHigh) + " °C";
            tempLowElement.textContent =  Math.round(tempLow)+ " °C";
         }
        if(unit === "F"){
            tempElement.textContent= tempInFarArr[0]; 
            tempHighElement.textContent = tempInFarArr[1] +"° F";
            tempLowElement.textContent = tempInFarArr[2] +"° F";
        }
    }
    app.getUserLocation();
   console.log(app.dataArr);  
    //https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139
}
)();
