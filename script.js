const apiKey="4ff55e84a9f72351fcf9583da917d56d"

const cityName = document.querySelector(".city-name");
const countryCode= document.querySelector(".country-name");


const time = document.querySelector(".time")
const dateInfo = document.querySelector(".date-day-year");

const currentCountryTemp = document.querySelector(".temp");


const temperatureDesc = document.querySelector(".temp-description")

const input = document.querySelector(".search-city")
const searchBtn = document.querySelector(".searc-btn")

const placeInfo = document.querySelector(".city-info")
const countryFlag = document.querySelector(".country-flag")


const container1 = document.querySelector(".container1")
const container2 = document.querySelector(".container2")



const temperature = document.querySelector("#temp")
const humidity = document.querySelector("#humidity")
const Visibility = document.querySelector("#Visibility")
const windSpeed = document.querySelector("#Wind-speed");

const locStatus = document.querySelector(".location-status");
const locStatusImg = document.querySelector(".location-status-img");



async function getLoc(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            initiateApp(position.coords.latitude, position.coords.longitude);
          },
          (err)=>{
            locStatus.textContent="Access Denied";
            locStatusImg.src="../images/access-denied.png";
          })
    }else{
    }
      
}

getLoc()


async function initiateApp(lat,lon){
    const data = await getWeatherReport(lat,lon);
    updateLeftSection(data)
    container1.style.display="none"
    container2.style.display="block"
    updaterightSection(data)
}

function updaterightSection(data){
    temperatureDesc.textContent = (data.weather[0].main)
    placeInfo.textContent = `${data.name}, ${data.sys.country}`
    countryFlag.src=`https://flagsapi.com/${data.sys.country}/flat/64.png`;
    temperature.innerHTML = `${Math.floor(data.main.temp)} &#x2103;`
    humidity.textContent = data.main.humidity+" %"
    Visibility.textContent = data.visibility+" ml"
    windSpeed.textContent = data.wind.speed+" km/h"

}

function updateTime(){
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    
    let noon = hours >= 12 ? "PM" : "AM"
    hours = hours > 12 ? hours : hours

    hours = hours < 10 ? '0'+hours : hours

    minutes= minutes < 10 ? '0'+minutes : minutes

    seconds = seconds < 10 ? '0'+seconds : seconds

    time.textContent = `${hours}:${minutes}:${seconds}`
}


const dateBuilder = () =>{
    const date = new Date()

    const days = {
        0 : "Sunday",
        1 : "Monday",
        2 : "Tuesday",
        3 : "Wednesday",
        4 : "Thursday",
        5 : "Friday",
        6 : "Saturday"
    }

    const months = {
        0 : "January",
        1 : "February",
        2 : "March",
        3 : "April",
        4 : "May",
        5 : "June",
        6 : "July",
        7 : "August",
        8 : "September",
        9 : "October",
        10 : "November",
        11 : "December"

    }

    return `${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}`

}

function updateLeftSection(data){

    cityName.textContent = data.name
    countryCode.textContent = data.sys.country
    currentCountryTemp.textContent = Math.floor(data.main.temp)
    input.value=data.name
    setInterval(updateTime,1000)
    dateInfo.textContent=dateBuilder();
}

const getWeatherReport = async (lat,lon)=>{
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const data = await response.json()
    return data
   
}

searchBtn.addEventListener("click",async ()=>{

    const cityName = input.value
    const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    try{
         response = await fetch(`${url}${cityName}&appid=${apiKey}`)
         const data = await response.json()
         updaterightSection(data)
    }catch(err){
        input.value="City not found"
    }
})
