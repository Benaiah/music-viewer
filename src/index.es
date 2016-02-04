import Promise from "bluebird"
import http from "http"
import fs from "fs"
import express from "express"
import serveStatic from "serve-static"
import S from 'string'
import toTitleCase from 'to-title-case'

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

const filenameToSlug = (song, pathRoot=apiRootPath) => {
  return S(song)
    .replaceAll('_', ' ')
    .chompLeft(pathRoot)
    .s
}
const filenameToName = (song, pathRoot=apiRootPath) => {
  return toTitleCase(
    S(song)
      .chompRight('.txt')
      .chompRight('.md')
      .chompLeft(pathRoot)
      .between('/')
      .humanize()
      .s)
}

app.get('/api/songs', (req, res) => {
  readdir(apiRootPath)
    .then(files => files.map(
      (file) => {
        return {
          slug: filenameToSlug(file),
          name: filenameToName(file)
        }
      }))
    .then(files => res.json({ songs: files }))
    .catch(err  => res.json({ error: err.toString() }))
})
app.get('/api/songs/*', (req, res) => {
  let song = req.params[0]
  readFile(apiRootPath + "/" + song)
    .then(file => res.json({
      slug: filenameToSlug(song),
      name: filenameToName(song),
      text: file.toString()
    }))
    .catch(err => res.json(error))
})

app.listen(port, () => console.log("Music browser listening on port 1337!"))
