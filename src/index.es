import Promise from "bluebird"
import http from "http"
import fs from "fs"
import express from "express"
import serveStatic from "serve-static"
import recursiveReaddir from "recursive-readdir"
import S from 'string'
import toTitleCase from 'to-title-case'
import cfg from 'config-node'

const config = cfg()

const app = express()

const hostname = '127.0.0.1'
const port = 1337

const readFile = Promise.promisify(fs.readFile)
const readdir = Promise.promisify(recursiveReaddir)

// App

app.get('/', (req, res) => {
  readFile("./app/index.html")
    .then(data => res.send(data.toString()))
})

app.use('/assets', serveStatic('app/assets', {}))


// API

const apiRootPath = config.api.rootPath

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
