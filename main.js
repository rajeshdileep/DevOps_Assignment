const express = require('express');
const mongoose = require('mongoose');

const app = express()
app.use(express.json());

//const uri = "mongodb+srv://rajesd:Rajesh123@rd-cluster.hwwtoaz.mongodb.net/userDB";
//const uri = "mongodb://:"+process.env.uname+":"+process.env.password+"@"+process.env.connection

//Create Schema
const userSchema = 
{
  name: String,
  address: String
}

//Create Model for the Schema
const User = mongoose.model("User", userSchema);

//Connect to DB
async function connect()
{
  const uri = "mongodb://"+process.env.uname+":"+process.env.password+"@"+process.env.connection
  try 
  {
    console.log(uri);
    await mongoose.connect(uri,{ useNewUrlParser: true},{useUnifiedTopology: true})
    console.log("Connected to MongoDB")
  } 
  catch(error)
  {
    console.error(error);
  }
}

//Read Data from DB
app.get("/fetchall", async (req, res)=>
{
  connect();
  const result = await User.find()
  
    res.json(result)
    console.log("Read Successful")
  
  })

//Write Data to DB
app.post("/adduser", async (req, res)=>
{
    const newUser = new User({
      name: req.body.name,
      address: req.body.address
    })
    const value = await newUser.save();
    res.json(value);
    console.log("Write Successful")
})

//Check server up and running
app.listen(3020, () => {
  console.log('RD DevOps app listening on port 3020!');
});
