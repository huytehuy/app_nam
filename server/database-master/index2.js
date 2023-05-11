const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectID } = require('mongodb');
// const index4 = require('./index4')

const app = express();
const uri = 'mongodb+srv://tientran214002:S060490yj@ai.vtabwv4.mongodb.net/?retryWrites=true&w=majority';

const mqtt = require('mqtt');

const AIO_USERNAME = 'huytehuy';
const AIO_KEY = 'aio_pnsw60sSuu6YAkzXL75tFfjDFrpc';
const FEED_NAME = 'light.status-light';
const topic = `${AIO_USERNAME}/feeds/${FEED_NAME}`

const client = mqtt.connect({
  hostname: 'io.adafruit.com',
  port: 1883,
  username: AIO_USERNAME,
  password: AIO_KEY,
});

app.use(bodyParser.json());
app.use(cors());
// const corsOptions = {
//     origin: 'http://192.168.1.202:19000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };
//   console.log(corsOptions.origin)

//   app.use(cors(corsOptions));


async function connectDB() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db('Login_Logout');
}

app.get('/users', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('users')
  const users = await collection.find({}).toArray();
  console.log(users)
  res.send(users);

});


app.post('/users', async (req, res) => {
  // const db = await connectDB();
  // const collection = db.collection('users');
  // const result = await collection.insertOne(req.body);s
  client.publish(topic,JSON.stringify(req.body), () => {
    console.log('Data published successfully');
    console.log(req.body);
    // client.end(); // Disconnect the client after publishing (optional)
  });
  // res.send(result);
});


app.listen(3000, () => {
  console.log('Server is running on port 4000');
});