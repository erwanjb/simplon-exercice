const express = require('express')
const routerClient = require('./client/index')
const routerSite = require('./site/index')
const routerRelance = require('./relance/index')

const Router = express.Router
const router = Router()

router.use('/client', routerClient)
router.use('/site', routerSite)
router.use('/relance', routerRelance)

module.exports = router