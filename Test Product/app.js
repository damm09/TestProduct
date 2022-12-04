if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}    
const express = require('express')
const app = express()
const port =  process.env.PORT || 3000
const router = require('./routes/index');
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)

app.use((err, req, res, next) => {
    if (err.name === `Not Found`) {
        res.status(404).json({
            statusCode: 404,
            message: err.name
        })
    } else if (err.name === `Forbidden`) {
        res.status(403).json({
            statusCode: 403,
            message: err.name
        })
    } else if (err.name === `SequelizeValidationError` || err.name === `SequelizeUniqueConstraintError`) {
        const errors = err.errors.map(el => el.message)
        res.status(400).json({
            statusCode: 400,
            message: errors[0]
        })
    } else if (err.name === `Email or Username and Password is Invalid`) {
        res.status(401).json({
            statusCode: 401,
            message: err.name
        })
    } else if (err.name === `passwords are not the same`) {
        res.status(401).json({
            statusCode: 401,
            message: err.name
        })
    } else if (err.name === `Email / Pass is wrong`) {
        res.status(401).json({
            statusCode: 401,
            message: err.name
        })
    } 
    else if (err.name === `Invalid Input`){
        res.status(400).json({
            statusCode: 400,
            message: err.name
        })
    } else if (err.name === `Not Modified`){
        res.status(304).json({
            statusCode: 304,
            message: err.name
        })
    } else {
        console.log(err);
        res.status(500).json({
            statusCode: 500,
            message: `Internal Server Error`
        })
    }
})

module.exports = app


