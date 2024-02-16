const searchBox = document.getElementById("input_city")
const btn = document.getElementById("search-btn")
const api_key = "d61f3c080a137ec6e9f0f917cf4ae013"
const api_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const pic = document.querySelector(".weather").firstElementChild

function saveLastData() {

    localStorage.setItem("city", document.querySelector(".city").innerHTML)
    localStorage.setItem("temp", document.querySelector(".temp").innerHTML)
    localStorage.setItem("humidity", document.querySelector(".humidity").innerHTML)
    localStorage.setItem("wind", document.querySelector(".wind").innerHTML)
    localStorage.setItem("w_pic",pic.src)
}
function getLastData() {

    document.querySelector(".city").innerHTML = localStorage.getItem("city")
    document.querySelector(".temp").innerHTML = localStorage.getItem("temp")
    document.querySelector(".humidity").innerHTML = localStorage.getItem("humidity")
    document.querySelector(".wind").innerHTML = localStorage.getItem("wind")
    pic.src = localStorage.getItem("w_pic")
}

async function checkWeather(){

    const response = (await fetch(api_URL + searchBox.value + `&appid=${api_key}`))
    let data =  await response.json();

    console.log(data);

    if(data.cod==404)
    {
        alert("Please enter the correct city name!")
        
    }
    else{

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = data.main.temp+" °C"
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%"
    document.querySelector(".wind").innerHTML = data.wind.speed+" km/h"

    if(data.weather[0].main == "Clouds"){

        pic.src = "images/cloudy.png"
    }
    else if(data.weather[0].main == "Clear"){

        pic.src = "images/sun.png"
    }
    else if(data.weather[0].main == "Drizzle"){

        pic.src = "images/drizzle.png"
    }
    else if(data.weather[0].main == "Rain"){

        pic.src = "images/rainy.png"
    }
    else if(data.weather[0].main == "Mist" || data.weather[0].main == "Snow"){

        pic.src = "images/snow.png"
    }
    else{

        pic.src = "images/cloudy.png"
    }
    

    saveLastData()
   }
}

btn.addEventListener("click", ()=>{

    if (searchBox.value == '') {

        alert("Please enter the City Name!")
    }
    else {

        checkWeather()
        searchBox.value = ''
    }
})

searchBox.addEventListener("keydown", (e)=>{

    if (e.key === "Enter") {

        if (searchBox.value == '') {

            alert("Please enter the City Name!")
        }
        else {
            
            checkWeather()
            searchBox.value = ''
        }
    }
})



getLastData()

