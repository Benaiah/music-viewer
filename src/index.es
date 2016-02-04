import Promise from "bluebird"
import http from "http"
import fs from "fs"
import express from "express"
import serveStatic from "serve-static"
import S from 'string'

const app = express()

const hostname = '127.0.0.1'
const port = 1337

const readFile = Promise.promisify(fs.readFile)
const readdir = Promise.promisify(fs.readdir)

// App

app.get('/', (req, res) => {
  readFile("./app/index.html")
    .then(data => res.send(data.toString()))
})

app.use('/assets', serveStatic('app/assets', {}))

// app.route('/assets')
//   .use((req, res, next) => {
//     console.log("Loading asset: " + req.originalUrl)
//     next()
//   })
//   .use(express.static(__dirname + '/app/assets'))
// app.get('/assets/bundle.js', (req, res) => res.sendFile(__dirname + "/app/assets/bundle.js"))


// API

const apiRootPath = "/home/benaiah/songs/"
const apiIndexPath = "june-heat.txt"
app.get('/api/songs', (req, res) => {
  readdir(apiRootPath)
    .then(files => files.map((file) => S(file).replaceAll(' ', '_').s))
    .then(files => res.json({ songs: files }))
    .catch(err  => res.json({ error: err.toString() }))
})
app.get('/api/songs/:song', (req, res) => {
  let SfileName = S(req.params.song).replaceAll('_', ' ')
  let fileName
  !SfileName.endsWith('.md') ? fileName = SfileName.s + '.txt' : fileName = SfileName.s
  readFile(apiRootPath + "/" + fileName)
    .then(file => res.json({
      name: S(fileName).humanize()
        .chompRight('.txt')
        .chompRight('.md').s,
      text: file.toString()
    }))
    .catch(err => res.json(error))
})

app.listen(port, () => console.log("Music browser listening on port 1337!"))
