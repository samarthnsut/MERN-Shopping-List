const express= require('express')
const app= express();
const port= process.env.PORT||5000;
var cors = require('cors')
const bodyParser=require('body-parser')
const db=require('./config/mongoose')
const items=require('./routes/api/items')
const users=require('./routes/api/users')
const auth = require('./routes/api/auth')


app.use(cors())
app.use(bodyParser.json())

app.use('/api/items',items)
app.use('/api/users',users)
app.use('/api/auth',auth)

app.listen(port,function(){
    console.log('server running')

})


