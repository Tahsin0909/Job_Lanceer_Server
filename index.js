const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const Job = database.collection('Job')
        const WatchList = database.collection('WatchList')
        const MyBid = database.collection('MyBid')
        const Gig = database.collection('Gig')
        // Send a ping to confirm a successful connection
        //User 
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
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { userFirebaseUid: id }
            const result = await User.findOne(query)
            res.send(result)
        })
        app.patch('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { userFirebaseUid: id }
            const UpdateUser = {
                $set: {
                    userLastSignInTime: req.body.userLastSignInTime
                }
            }
            const result = await User.updateOne(query, UpdateUser)
            res.send(result)
        })
        //MyBid
        app.put('/myBid', async (req, res) => {
            const MyBidData = req.body
            console.log(MyBidData);
            const options = { upsert: true }
            const query = {
                jobId: MyBidData.jobId,
                userFirebaseUid: MyBidData.userFirebaseUid,
            }
            const UpdateCart = {
                $set:
                {
                    bidRequestEmail: MyBidData.bidRequestEmail,
                    userFirebaseUid: MyBidData.userFirebaseUid,
                    email: MyBidData.email,
                    jobTitle: MyBidData.jobTitle,
                    jobCategory: MyBidData.jobCategory,
                    postedDate: MyBidData.postedDate,
                    deadLine: MyBidData.deadLine,
                    jobId: MyBidData.jobId,
                    status: MyBidData.status,
                }

            };
            const result = await MyBid.updateOne(query, UpdateCart, options)
            res.send(result)
        })
        app.get('/myBid', async (req, res) => {
            const cursor = MyBid.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/bid/:jobId', async (req, res) => {
            const id = req.params.jobId
            const query = { jobId: id }
            const cursor = MyBid.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.patch('/bid/:jobId', async (req, res) => {
            const id = req.params.jobId
            const statusData = req.body
            const query = { jobId: id }
            const UpdateStatus = {
                $set: {
                    status: statusData.status
                }
            }
            const result = await MyBid.updateOne(query, UpdateStatus)
            res.send(result)
        })
        app.get('/myBid/:id', async (req, res) => {
            const id = req.params.id
            const query = { userFirebaseUid: id }
            const cursor = MyBid.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/bidReq/:email', async (req, res) => {
            const id = req.params.email
            const query = { email: id }
            const cursor = MyBid.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        //Post Job
        app.post('/job', async (req, res) => {
            const job = req.body;
            console.log(job);
            const result = await Job.insertOne(job)
            res.send(result)
        })
        app.get('/job', async (req, res) => {
            const cursor = Job.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/job/:id', async (req, res) => {
            const id = req.params.id
            const query = { userFirebaseUid: id }
            const cursor = Job.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.put('/UpdateJob/:id', async (req, res) => {
            const id = req.params.id
            const data = req.body
            const query = { _id: new ObjectId(id) }
            const UpdateCart = {
                $set:
                {
                    email: data.email,
                    jobTitle: data.jobTitle,
                    description: data.description,
                    minPrice: data.minPrice,
                    maxPrice: data.maxPrice,
                    tag1: data.tag1,
                    tag2: data.tag2,
                    deadLine: data.deadLine,
                    jobCategory: data.jobCategory,
                    postedDate: data.postedDate,
                    userFirebaseUid: data.userFirebaseUid
                }

            };
            const result = await Job.updateOne(query, UpdateCart, options)
            res.send(result)
        })
        app.get('/jobCategory/:category', async (req, res) => {
            const id = req.params.category
            const query = { jobCategory: id }
            const cursor = Job.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        //Gig
        app.put('/gig', async (req, res) => {
            const GigData = req.body
            console.log(GigData);
            const options = { upsert: true }
            const query = {
                userFirebaseUid: GigData.userFirebaseUid,
            }
            const UpdateCart = {
                $set:
                {
                    email: GigData.email,
                    gigTitle: GigData.gigTitle,
                    description: GigData.description,
                    minPrice: GigData.minPrice,
                    maxPrice: GigData.maxPrice,
                    tag1: GigData.tag1,
                    tag2: GigData.tag2,
                    rating: GigData.rating,
                    gigCategory: GigData.gigCategory,
                    userFirebaseUid: GigData.userFirebaseUid,
                    userName: GigData.userName,
                    userPhoto: GigData.userPhoto,
                    photoUrl: GigData.photoUrl
                }

            };
            const result = await Gig.updateOne(query, UpdateCart, options)
            res.send(result)
        })
        app.get('/gig', async (req, res) => {
            const cursor = Gig.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/gig/:id', async (req, res) => {
            const id = req.params.id
            const query = { userFirebaseUid: id }
            const result = await Gig.findOne(query)
            res.send(result)
        })
        //WatchList
        app.put('/watchList', async (req, res) => {
            const watchListData = req.body
            console.log(watchListData);
            const options = { upsert: true }
            const query = {
                jobId: watchListData.jobId,
                userFirebaseUid: watchListData.userFirebaseUid,
            }
            const UpdateCart = {
                $set:
                {
                    userFirebaseUid: watchListData.userFirebaseUid,
                    email: watchListData.email,
                    jobTitle: watchListData.jobTitle,
                    jobCategory: watchListData.jobCategory,
                    postedDate: watchListData.postedDate,
                    jobId: watchListData.jobId
                }

            };
            const result = await WatchList.updateOne(query, UpdateCart, options)
            res.send(result)
        })
        app.get('/watchList', async (req, res) => {
            const cursor = WatchList.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/watchList/:id', async (req, res) => {
            const id = req.params.id
            const query = { userFirebaseUid: id }
            const cursor = WatchList.find(query)
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