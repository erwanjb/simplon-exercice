const express = require('express')
const addClient = require('./addClient')
const getAllClient = require('./getAllClient')
const getName = require('./getName')
const updateClient = require('./updateClient')
const deleteClient = require('./deleteClient')
const getHebergement = require('./getHebergement')
const getRelance = require('./getRelance')

const Router = express.Router
const router = Router()

router.post('/addClient', async (req, res) => {
    const reponse = await addClient(req.body.client)
    res.send(reponse)
})

router.get('/getAllClient', async (req, res) => {
    const reponse = await getAllClient()
    res.send(reponse)
})

router.get('/getName/:id', async (req, res) => {
    const reponse = await getName(req.params.id)
    res.send(reponse)
})

router.put('/updateClient', async (req, res) => {
    const reponse = await updateClient(req.body.client)
    res.send(reponse)
})

router.delete('/deleteClient/:id', async (req, res) => {
    const reponse = await deleteClient(req.params.id)
    res.send(reponse)
})

router.get('/getHebergement/:id' , async (req, res) => {
    const reponse = await getHebergement(req.params.id)
    res.send(reponse)
})

router.get('/getRelance/:id' , async (req, res) => {
    const reponse = await getRelance(req.params.id)
    res.send(reponse)
})

module.exports = router