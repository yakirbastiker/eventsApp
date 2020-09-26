const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Event = require('./models/event');
const event = require('./models/event');

const app = express();

mongoose.connect("mongodb+srv://yakir:ts3L4P3seBsQZpJ@cluster0.cqlfk.mongodb.net/eventsApp?retryWrites=true&w=majority")
.then(() => {
  console.log('connected to database!!!');
})
.catch(()=> {
  console.log("connection failed!!");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/events", (req,res,next) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    info: req.body.info,
    imgURL: req.body.imgURL,
    category: req.body.category

  });

  event.save().then(createdevent => {
    res.status(201).json({
      message: "Post added successfully",
      eventId: createdevent._id
    });
  });
});

app.put("/api/events/:id", (req, res, next) => {
  const editEvent = new Event({
    title: req.body.title,
    date: req.body.date,
    info: req.body.info,
    category: req.body.category,
    imgURL: req.body.imgURL,
    _id: req.body.id
  })
  event.updateOne({_id: req.params.id}, editEvent)
  .then(result => {
    console.log(result);
    res.status(200).json({message: "update successful!"});
  });
});

app.get('/api/events',(req, res, next) => {

  Event.find()
    .then(documents => {
      res.status(200).json({
        message: "events fetched succesfully",
        events: documents
      });
    });
    
});

app.delete("/api/events/:id", (req,res,next) => {
  console.log(req.params.id)
  Event.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'event delete'});
  });
});

module.exports = app;