const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());

const uri =
  'mongodb+srv://202015210016:6OAfD8GtStKDNFJl@cinebru.4nogssk.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/filmes', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('cinebru');
    const collection = database.collection('cinebru');

    const filmes = await collection.find({}).toArray();
    res.json(filmes);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/filmes`);
});
