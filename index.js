const express = require('express')
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());



app.get('/', (req, res) => {
     res.send('Hello World!')
})



const uri = "mongodb+srv://Storyearth:TdzXDys2MZ8XFGlO@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});

async function run() {

     // Connect the client to the server	(optional starting in v4.7)
     const TokenCollection = client.db("StoryEarth").collection("token");




     app.get('/token', async (req, res) => {
          const result = await TokenCollection.find().toArray();
          res.send(result);
     })
     app.get('/token/:id', async (req, res) => {
          const result = await TokenCollection.findOne({_id: new ObjectId(req.params.id)})
          res.send(result);
     })



     // Send a ping to confirm a successful connection
     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})