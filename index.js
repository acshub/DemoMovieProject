const express = require('express')
const ombClient = require('omdb-client')
const bodyParser = require('body-parser')
const app = express()
const port = 3017

const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAU3QbSxOJny454Ix7C4lJOCxERg3UTqC0')

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

app.listen(port, () => console.log(`Movie app listening on port ${port}!`))