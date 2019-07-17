const express = require('express')
const router = require('./route/index')
const app = express()
const port = 8080

app.use(router)
app.listen(port)