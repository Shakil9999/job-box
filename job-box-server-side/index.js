require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
  origin: ['http://localhost:5173', "https://job-box-client-five.vercel.app/"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

const verifyToken = (req, res, next)=>{
  const token = req.cookies?.token
  console.log("inside verify",token)

  if(!token){
    return res.status(401).send({message: "Unauthorized Access"})
  }

  //verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    if(err){
      return res.status(401).send({message: "Unauthorized Access"})
    }
    req.user = decoded
    next()
  })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d86wd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("job_box");
    const jobCollection = db.collection("jobs");
    const jobApplicationCollection = db.collection("jobs-application");
    const userCollection = db.collection("users");

    //Auth related apis
    app.post('/jwt', async(req, res)=>{
      const user = req.body
      // console.log(user)
      const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '5h'})
      res
      .cookie('token', token, {httpOnly: true, secure: false})
      .send({success: true})
    })

    app.post('/logout', async(req, res)=>{
      res
      .clearCookie('token', {httpOnly: true, secure: false})
      .send({success: true})
    })

    //user related APIs
    app.get('/users', async(req, res)=>{
      const result = await userCollection.find().toArray()
      res.send(result)
      
    })

    app.post('/users', async(req, res)=>{
      const user = req.body
      // console.log(user)
      const result = await userCollection.insertOne(user)
      res.send(result)
    })


    //Job related APIs
    app.get("/job", async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { hr_email: email };
      }
      const result = await jobCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id)
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(query);

      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const jobData = req.body;
      const result = await jobCollection.insertOne(jobData);
      res.send(result);
    });

    //job-application related APIs

    app.get("/job-application", verifyToken, async (req, res) => {
      const email = req.query.email;

      if(req.user.email !== req.query.email){
        return res.status(403).send({message: "Forbidden Access"})
      }
      const query = { applicant_email: email };
      // const cookies = (req.cookies)
      // console.log('cookies token', cookies)
      const result = await jobApplicationCollection.find(query).toArray();

      for (application of result) {
        const jobsID = application.jobId.id;

        const query1 = { _id: new ObjectId(jobsID) };
        const job = await jobCollection.findOne(query1);
        if (job) {
          application.title = job.title;
          application.company = job.company;
          application.location = job.location;
          application.company_logo = job.company_logo;
        }
      }
      res.send(result);
    });

    app.get("/job-application/jobs/:job_id", async (req, res) => {
      const jobId = req.params.job_id;
      const query = { "jobId.id": jobId }; 
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/job-application", async (req, res) => {
      const jobApplication = req.body;
      const result = await jobApplicationCollection.insertOne(jobApplication);
      res.send(result);
    });
    app.patch("/job-application/:id", async(req, res)=>{
      const id = req.params.id;
      const data = req.body
      const filter = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set: {
          status: data.status
        }
      }
      const result = await jobApplicationCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Default route
app.get("/", (req, res) => {
  res.send("server is running");
});
// Start the server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
