const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
//middleware
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uxzfht6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("JobLancer")
        const User = database.collection('User')
        // Send a ping to confirm a successful connection

        app.post('/user', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await User.insertOne(user)
            res.send(result)
        })
        app.get('/user', async (req, res) => {
            const cursor = User.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', async (req, res) => {
    res.send("This is a JobLancer Server")
})
app.listen(port, () => {
    console.log('App listing on PORT:', port)
})