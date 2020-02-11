const express = require('express')
const ombClient = require('omdb-client')
const bodyParser = require('body-parser')
const app = express()
const port = 3017

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAU3QbSxOJny454Ix7C4lJOCxERg3UTqC0')

const config = {
   mongoUrl: "mongodb+srv://nate_admin:Test123!@movies-s8oyf.mongodb.net/test?retryWrites=true&w=majority",
   database: "movies"
}

app.set("mongoUrl", config.mongoUrl)
app.set("database", config.database)

const ModelRoutes = require("./src/routes/model-routes")

app.use('/', express.static('public'))

app.use( bodyParser.json() ) 

app.use('/status', (request, response) => {
    response.json({
        status: "OK"
    })
})

app.post("/list/movie", (request, response) => {
    let parameters = {
        apiKey: "67bd411",
        title: request.body.title
    }

    if(request.body.year) {
        parameters.year = request.body.year
    }
    
    ombClient.get(parameters, (error, data) => {
        let fullResponse = {}
        fullResponse.movieResponse = data
        youtube.searchVideos(data.Title + ' ' + data.Year + 'trailer')
        .then(results => {
            let trailerId = results[0].id
            let video = `https://www.youtube.com/embed/${trailerId}`
            fullResponse.youtubeResponse = video
            response.json(fullResponse) 
        })
    })
})

const router = express.Router()

ModelRoutes.getRoutes(app, router)

app.use("/api", router)

app.listen(port, () => console.log(`Movie app listening on port ${port}!`))