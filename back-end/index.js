const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose')
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')

const app = express();

const PORT = process.env.PORT || 4000;
/* Setting the strictQuery to true. */
mongoose.set('strictQuery', true);

/* Connecting to the mongodb database. */
const connection = mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((response) => {
        console.log('MongoDb connected');
    });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
/* This is a middleware that is used to handle cross-site requests. manage header issue */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})


//static file location declared here
app.use(express.static(path.join(__dirname, 'public')));


// global error handler
app.use((err, req, res, next) => {
    // logger.error(err);
    return res.status(500).json({ message: err.message });
})

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});

require('./app/routes/api')(app)