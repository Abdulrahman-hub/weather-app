window.addEventListener('load', () => {
    let long;
    let lat;
    // const proxy = 'https://cors-anywhere.herokuapp.com/'
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationTimezone = document.querySelector('.location-timezone')
    const weatherIcon = document.querySelector('.weather-icon')
    const temperature = document.querySelector('.temperature')
    const degreeSection = document.querySelector('.degree-section')
    const degreeIcon = document.querySelector('.degree-icon')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e778fe1f14e2789dbaff97f765f1d7a2`

            fetch(api)
                .then(responsse => {
                    return responsse.json()
                })
                .then(data => {
                    /*
                    store the needed data
                    */
                    const { temp } = data.main                   // the temperature in Kelvin
                    const celsius = temp - 273.15                // the temperature in celsius
                    const fahrenheit = temp * 9 / 5 - 459.67     // the temperature in fahrenheit
                    const { description, id } = data.weather[0]
                    const { country } = data.sys
                    /*
                    set dom elements from the api
                    */
                    temperatureDegree.textContent = Math.floor(celsius)
                    degreeIcon.classList.add('wi-celsius')
                    temperatureDescription.textContent = description
                    locationTimezone.textContent = country
                    // add the appropiate class to the <i> to display the icon
                    weatherIcon.classList.add(`wi-owm-${id}`)
                    degreeSection.addEventListener('click', () => {
                        let isFahrenheit = toggleDegree()
                        if (isFahrenheit) {
                            temperatureDegree.textContent = Math.floor(fahrenheit)
                        } else {
                            temperatureDegree.textContent = Math.floor(celsius)
                        }
                    })
                }).catch(e => console.error("couldn't fetch the data from the server because " + e.message))
        })
    }

    // change the degree icon and return a String (fahrenheit/celsius)
    function toggleDegree() {
        if (degreeIcon.classList.toggle('wi-fahrenheit')) {
            degreeIcon.classList.remove('wi-celsius')
            return true
        } else {
            degreeIcon.classList.toggle('wi-celsius')
        }
    }

})
