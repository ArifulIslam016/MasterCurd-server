 require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.it2aswp.mongodb.net/?appName=Cluster0`;
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
    await client.connect();
    const DB=client.db(process.env.DB_NAME)
app.use((req, res, next) => {
  req.dbclient = DB;
  next();
});
// Routes----------------------------------------------
const addStudents=require('./addStudents')
const getStudent=require('./getStudent')
const deleteStudent=require('./deleteStudent')
app.use('/getStudents',getStudent)
app.use('/deleteStudent',deleteStudent)
app.get('/', (req, res) => {
  res.send('Master Curd Operation')
})
app.use('/addStudents', addStudents)
await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

    
  } catch (e) {
    console.error(e);
  }
}
run().catch(console.dir);





