const express = require('express')
var opener = require("opener")
const app = express()
const port = 3000

const path = require('path')

// Serve up static content to test library
app.use('/', express.static(path.join(__dirname, '/')))
app.use('/inline-js', express.static(path.join(__dirname, './inline-js')))
app.use('/typescript', express.static(path.join(__dirname, './typescript')))
app.use('/vanilla-js', express.static(path.join(__dirname, './vanilla-js')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

// Check if server is running
app.listen(port, ()=>{
  const url = `http://localhost:${port}/index.html`;
  console.log(`Example app listening at ${url}`)
  opener(url);
});