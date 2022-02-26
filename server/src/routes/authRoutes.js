const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const router = express.Router()

router.post('/signUp', async (req, res) => {
    const { email, password } = req.body
    console.log("SIGNUP")
    try {
        const user = new User({ email, password })
        await user.save()
        const token = jwt.sign({userId:user._id},'A_SECRET_KEY')
        res.send({token})
    } catch (err) {
        console.log("error!!!")
        return res.status(422).send(err.message)
    }
})

router.post('/signIn',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    return res.status(422).send({error:"Invalid Username/Password"})
    
        const user = await User.findOne({email})
        if(!user)
        return res.status(422).send({error:"Invalid Username/Password"})
        try{    console.log("TRY")
                await user.comparePassword(password);
                const token = jwt.sign({userId:user._id},'A_SECRET_KEY')
                res.send({token})
        }catch(err){
            return res.status(422).send({error:"Invalid Username/Password"})
        }
})

module.exports = router;