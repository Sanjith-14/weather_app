var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var button = document.querySelector('.submit');
var pressure = document.querySelector('.pressure');
var humidity = document.querySelector('.humidity');

//For displaying time
var showCurrentTime = function() {
    var clock = document.getElementById('clock');
    var time = new Date;
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var meridian = "AM";
    if (hours >= 12) {
        meridian = "PM";
    }
    if (hours > 12) {
        hours -= 12;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var clocktime = hours + ':' + minutes + ':' + seconds + " " + meridian;
    clock.innerText = clocktime;
};
var updateClock = function() {
    var time = new Date;
    var hours = time.getHours();
    showCurrentTime();
};
updateClock();
var oneSecond = 100;
setInterval(updateClock, oneSecond);


button.addEventListener('click', function(name) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=50a7aa80fa492fa92e874d23ad061374')
        .then(response => response.json())
        .then(data => {
            var tempValue = data['main']['temp'];
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];
            var pressurevalue = data['main']['pressure'];
            var humidityvalue = data['main']['humidity'];
            main.innerHTML = "Place - " + nameValue;
            desc.innerHTML = "Description - " + descValue;
            temp.innerHTML = "Temperature - " + tempValue + " °C";
            pressure.innerHTML = "Pressure -" + pressurevalue + " Pa";
            humidity.innerHTML = "Humidity - " + humidityvalue + "%";
            input.value = "";

        })

    .catch(err => alert("Wrong city name!Enter correct name.."));
})