// Local weather App - freecodecamp front end project
/*
if(typeof app === 'undefined'){
    var app ={ }
}

 app.xmlHttp = false;
 app.appId = '5f5b02d9537e3e5f8670956c1dfc6cb8';
 
 app.xmlHttpConnection = function(){
     if(window.XMLHttpRequest){
        this.xmlHttp = new XMLHttpRequest()
     }else {
         if(window.ActiveXObject){
             this.xmlHttp = new ActiveXObject('MSXML2.XMLHTTP.3.0');
         }
     }
     return this.xmlHttp;
 }

app.getLocation = function(){
    if(!navigator.geolocation){
        alert("sorry your location not found");
    }
    else{
        const LOCATION = navigator.geolocation.getCurrentPosition(this.locationSuccess,this.locationError);
    }
}

app.locationSuccess = function(locationData){
    let xmlHttp = app.xmlHttpConnection(); //here problem using this
    const LONGITUDE = locationData.coords.longitude;
    const LATITUDE =locationData.coords.latitude;
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&APPID=${app.appId}&units=metric`;
    
    xmlHttp.onreadystatechange = app.displayWeatherInfo;
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);   
     
}

app.locationError = function(){
 alert("Unable to get your Location, Try again Later");
}

app.displayWeatherInfo = function(){
    if(this.readyState == 4 && this.status == 200){
        console.log(this);
    }
}
app.getLocation();
 */
( function(){
    var app = {
      httpCon : false,
      
    }
    let city = document.getElementById("city");
    let time = document.getElementById("local-time");
    let description =document.getElementById("description");
    let icon = document.getElementById("icon");
    let temp = document.getElementById('temp');
    //console.log(icon);
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
        app.getWeatherForecast(longitude,latitude);
         
    }
    
    app.getWeatherForecast = function(lon,lat){        
        let connection = this.xmlHttpConnection();
        connection.open("GET",`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`);
        connection.onreadystatechange= app.updateWeatherForecast;
        connection.send();
    }
    app.updateWeatherForecast = function(){
        if(this.status == 200 && this.readyState == 4){
            let data = JSON.parse(this.responseText);
            city.textContent =data.name + "," + data.sys.country;
            description.textContent = data.weather[0].description;
            icon.setAttribute("src",data.weather[0].icon);
            temp.textContent= data.main.temp;
             //console.log(data);
            
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
           
        }
         
          
    }

     
    app.getUserLocation();

    
    //https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139
}

)();