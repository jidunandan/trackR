require('./models/User')
require('./models/Track')
const express =require ('express')
const mongoose = require('mongoose')
const bodyParser =require('body-parser')
const router = require('./routes/authRoutes')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth  = require('./middlewares/requireAuth')

const mongoURI = 'mongodb+srv://admin:passwordpassword@cluster0.ouvqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const app = express()
app.use(bodyParser.json())
app.use(router)
//app.use(authRoutes)
app.use(trackRoutes)
mongoose.connect(mongoURI)
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo instance")
})
mongoose.connection.on('error',(error)=>{
    console.log("error occured,"+error)
})



app.get('/',requireAuth,(req,res)=>{
    res.send(`Hi there user, ${req.user.email}`)
})

app.listen('4000',()=>{
    console.log('listening on 4000 port....')
})