if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const fetch = require("node-fetch")

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/api', (req, res) => {
    const long = req.query.long
    const lat = req.query.lat
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OWM_API_KEY}`
    fetch(api).then(response => {
        return response.json()
    })
        .then(data => {
            const { temp } = data.main
            const { description, id } = data.weather[0]
            const { country } = data.sys
            res.json({
                temperature: temp,
                description: description,
                country: country,
                id: id})
        })
})



app.listen(process.env.PORT || 3000)