const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://samarth123:samarth123@cluster0-m8okk.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });

var db = mongoose.connection;

db.on('error',console.error.bind("error in connecting to db"));

db.once('open',function(){
    console.log("database connection successful");
})

