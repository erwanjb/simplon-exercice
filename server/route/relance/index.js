const express = require('express')
const getAllRelance = require('./getAllRelance')
const getRelance = require('./getRelance')
const updateRelance = require('./updateRelance')
const addRelance = require('./addRelance')
const deleteRelance = require('./deleteRelance')

const Router = express.Router
const router = Router()

router.get('/getAllRelance', async (req, res) => {
    const reponse = await getAllRelance()
    res.send(reponse)
})

router.get('/getRelance/:id', async (req, res) => {
    const reponse = await getRelance(req.params.id)
    res.send(reponse)
})

router.put('/updateRelance', async (req, res) => {
    const reponse = await updateRelance(req.body.relance)
    res.send(reponse)
})

router.post('/addRelance', async (req, res) => {
    const reponse = await addRelance(req.body.relance)
    res.send(reponse)
})

router.delete('/deleteRelance/:id', async (req, res) => {
    const reponse = await deleteRelance(req.params.id)
    res.send(reponse)
})

module.exports = router