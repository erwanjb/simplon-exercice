const express = require('express')
const addSite = require('./addSite')
const getAllSite = require('./getAllSite')
const getSite = require('./getSite')
const updateSite = require('./updateSite')
const deleteSite = require('./deleteSite')

const Router = express.Router
const router = Router()

router.post('/addSite', async (req, res) => {
    const reponse = await addSite(req.body.site)
    res.send(reponse)
})

router.get('/getAllSite', async (req, res) => {
    const reponse = await getAllSite()
    res.send(reponse)
})

router.get('/getSite/:id', async (req, res) => {
    const reponse = await getSite(req.params.id)
    res.send(reponse)
})

router.put('/updateSite', async (req, res) => {
    const reponse = await updateSite(req.body.site)
    res.send(reponse)
})

router.delete('/deleteSite/:id', async (req, res) => {
    const reponse = await deleteSite(req.params.id)
    res.send(reponse)
})

module.exports = router