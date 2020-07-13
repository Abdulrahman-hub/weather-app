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

            fetch(`/api?lat=${lat}&long=${long}`)
                .then(responsse => {
                    return responsse.json()
                })
                .then(data => {
                    // the temperature in celsius
                    const celsius = data.temperature - 273.15
                    // the temperature in fahrenheit
                    const fahrenheit = data.temperature * 9 / 5 - 459.67
                    /*
                    set dom elements from the api
                    */
                    temperatureDegree.textContent = Math.floor(celsius)
                    degreeIcon.classList.add('wi-celsius')
                    temperatureDescription.textContent = data.description
                    locationTimezone.textContent = data.country
                    // add the appropiate class to the <i> to display the icon
                    weatherIcon.classList.add(`wi-owm-${data.id}`)
                    degreeSection.addEventListener('click', () => {
                        let isFahrenheit = toggleDegree()
                        if (isFahrenheit) {
                            temperatureDegree.textContent = Math.floor(fahrenheit)
                        } else {
                            temperatureDegree.textContent = Math.floor(celsius)
                        }
                    })
                })

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
