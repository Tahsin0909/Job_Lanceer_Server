const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
//middleware
app.use(cors())
app.use(express())









app.get('/', async (req, res) => {
    res.send("This is a JobLancer Server")
})
app.listen(port, () => {
    console.log('App listing on PORT:', port)
})