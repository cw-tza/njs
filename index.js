'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  UUID = require('uuid-js'),
  mongo = require('mongodb').MongoClient;

// Constants
const PORT = 8085;
const HOST = '0.0.0.0';


const app = express();
app.use(bodyParser.json()); // for parsing application/json

app.post('/xxx', (req, res) => {

  mongo.connect("mongodb://localhost:33333/ds1").then(db => {

    const nextSeqVal = () => db.collection('counters')
                               .findOneAndUpdate(
                                 {_id: 'xxx'},
                                 {$inc: {seq: 1}}
                               ).then(data => data.value.seq);

    const storeRequest = id => db.collection('xxx')
                                 .updateOne(
                                   {_id: id, body: req.body},
                                   {$set: {timestamp: new Date()}},
                                   {upsert: true}
                                 );

    nextSeqVal()
      .then(storeRequest)
      .then(() => {
        db.close();
        res.send('Hello world\n', 202);
      });

  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);