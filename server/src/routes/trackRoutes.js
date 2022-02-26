const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')
const router = express.Router()

router.use(requireAuth)

router.get('/tracks', async (req, res) => {
    console.log("GETTRACKSCALLED")
    const tracks = await Track.find({ userId: req.user._id })
    console.log(tracks.length)
    res.send(tracks)
})
router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body
    if (!name || !locations) {
        //console.log('here')
        return res.status(422).send({ error: "Invalid name/locations/user" })
    }
    try {
        const track  = new Track({name,locations,userId:req.user._id})
        await track.save()
        res.send(track)
    } catch (err) {
        //console.log('here2')
        return res.status(422).send({ error: "Invalid name/locations/user" })
    }
})
module.exports = router