// Local weather App - freecodecamp front end project
( function(){

    var app = {
        httpCon : false,
      }

    let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const date = new Date();
    const today = days[date.getDay()];
    const currentTime =date.getHours() + ":" + date.getMinutes();
    
   
    let city = document.getElementById("city");
    let time = document.getElementById("local-time");
    let weatherDescription =document.getElementById("description");
    let weatherIcon = document.getElementById("icon");
    let temp = document.getElementById('temp');
    let tempHigh = document.getElementById('temp-high');
    let tempLow = document.getElementById('temp-low');
    let humidity = document.getElementById('humidity');
    let pressure = document.getElementById('pressure');
    let windSpeed = document.getElementById('wind-speed');
     
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
    app.getUserLocation = function(){
        if(!navigator.geolocation){
            alert("Failed to get your Location");
        }
        else{
            const userLocation = navigator.geolocation.getCurrentPosition(this.userLocationSuccess,this.userLocationError);
        }        
    }
    app.userLocationSuccess = function(location){        
        const longitude = location.coords.longitude;
        const latitude = location.coords.latitude;
        //const latitude = 28.7041;
        //const longitude = 77.1025;
        app.getWeatherForecast(longitude,latitude);
         
    }
    
    app.getWeatherForecast = function(lon,lat){        
        let connection = this.xmlHttpConnection();
        connection.open("GET",`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`);
        connection.onreadystatechange= app.updateWeatherForecast;
        connection.send(null);
    }
    app.updateWeatherForecast = function(){
        if(this.status == 200 && this.readyState == 4){
            let data = JSON.parse(this.responseText);
            city.textContent =data.name + ", " + data.sys.country;
            time.textContent = today + ", " + currentTime; 
            description.textContent = data.weather[0].description;

            weatherIcon.setAttribute("src",data.weather[0].icon);
            temp.textContent= data.main.temp;
            tempHigh.textContent += data.main.temp_max;
            tempLow.textContent += data.main.temp_min;
            pressure.textContent += data.main.pressure;
            humidity.textContent += data.main.humidity;
            windSpeed.textContent += data.wind.speed;
            console.log(data);
           /* 
            console.log(data.name);
            console.log(data.sys.country);
            console.log("temp " + data.main.temp);
            console.log("humidity " + data.main.humidity);
            console.log("pressure " + data.main.pressure);
            console.log("temp_min " + data.main.temp_min);
            console.log("temp_max " + data.main.temp_max);
            console.log("wind" +data.wind.speed);
            console.log("description - " + data.weather[0].description);
            console.log("Icon - " + data.weather[0].icon);
            */
           
        }
         
          
    }

     
    app.getUserLocation();

    
    //https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139
}

)();