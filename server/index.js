const express = require('express')
const router = require('./route/index')
const app = express()
const port = 8080
const bodyParser = require("body-parser")
const cors = require("cors")
const CronJob = require('cron').CronJob;
const getCron = require('./cron')

// tous les jours à 15h
const job = new CronJob('0 0 15 * * *', getCron);
job.start();

app.use(cors())

app.use(bodyParser.json())

app.use(router)
app.listen(port)