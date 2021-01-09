const express= require('express');
const { Mongoose } = require('mongoose');

const bodyParser= require('body-parser');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv/config');


//middlewares
app.use(cors());
app.use(bodyParser.json());

/*app.use('/posts', () => {
console.log('hello, middleware here!');
});*/


//import routes
const postRoute = require('./routes/posts');
app.use('/posts', postRoute);

//Routes
app.get('/', (req,res) => {
res.send('homyyyyy');
});



//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, 
() => console.log('connected to DB!'));


//listening to server
app.listen(3000);
