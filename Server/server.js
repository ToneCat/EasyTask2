const express = require('express')
const app = express()
var port =  3000;
const mongo = require('mongodb').MongoClient
var cors = require('cors')


app.use(cors()) //bypass cors


const url = 'mongodb+srv://484:tony@cluster0-ztofz.mongodb.net/test?retryWrites=true' //MongoDB remote string
 


app.post('/api/tasks/', function(req, res) { //post function to post new task into db
var desc = req.query.description


var isComplete = false //set isComplete to false automatically

if (!desc || desc == ''){ //error response for empty/ no description
    res.status(400)
    res.send({
   parameterName: 'description',
   parameterValue: desc,
   errorText: "The task description must have a proper value"

})
}

else{ // if there is a proper description, then connect and add task to system
mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
const db = client.db('homework')
const collection = db.collection('tasks')
var numberofDocs =0;


collection.countDocuments().then((count) => { // counts documents in current collection and returns it, for incremented id
    numberofDocs = count+1; //increments ID
    console.log(numberofDocs)

}).then((response) => collection.insertMany( //async ".then" so it gets document count before insertion
    [{_id: numberofDocs, // <- this is the document count, which will made the task ID
     description: desc, 
     isComplete: isComplete, 
     dateCreated: (new Date(Date.now()).toISOString()).split('T')[0],
     dateCompleted: 'in progress'}], (err, result) => {
      var location = 'http://localhost:3000/:'+numberofDocs; // sets header location
      res.setHeader('Location', location); // response header url
     res.sendStatus(201); 
     client.close()
}))
  if (err) {
    console.error(err)
    return
  }
})
    
}
})

app.get('/api/tasks/:id', function(req, res) { // retrieves document for given ID
var id = parseInt(req.params.id)
if (id == undefined || !id || id === null){ //error response for empty/ no id
    res.status(400)
    res.send({
   parameterName: 'id',
   parameterValue: id,
   errorText: "An ID integer value must be given as a parameter. This is required"

})
}



else{
mongo.connect(url, { useNewUrlParser: true }, (err, client) => { // for printing task according to given ID
const db = client.db('homework')
const collection = db.collection('tasks')

collection.findOne({"_id": id}, (err, items) => {
  if(items){ // if items exist, send them
res.status(200); 
  res.send(items)
  client.close()
}
else{ //couldnt find the ID
  res.status(404)
    res.send({
   parameterName: 'ID',
   parameterValue: id,
   errorText: "Unable to find ID"

})

}
})
  if (err) {
    console.error(err)
    return
  }
})
    
}
})

app.get('/api/tasks', function(req, res) { //finds all docs and sends to user
mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
const db = client.db('homework')
const collection = db.collection('tasks')

console.log("hey")


collection.find({}).toArray(function(err, docs) { //finds all documents
            console.log(docs);
            res.status(200);
            res.send(docs);
            client.close() //closes DB connection
        });

  if (err) {
    console.error(err)
    return
  }
})
})



app.patch('/api/tasks/:id', function(req, res) { //update function
var id = parseInt(req.params.id) // id in route
var desc = req.query.description
var comp = req.query.isComplete // request body parameter for isComplete


// converts to boolean
if (comp === "true"){
  comp = true
}
else{
  comp = false
}

if (id){

if (desc == null || desc == ''){ // if desc is null or empty
   res.status(400)
    res.send({
   parameterName: 'Description',
   parameterValue: desc,
   errorText: "Task description must have a proper value"

})
}
if (comp == null){ // is isComplete is null
  res.status(400)
    res.send({
   parameterName: 'isComplete',
   parameterValue: comp,
   errorText: "isComplete must not be null"

})

}

mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
const db = client.db('homework')
const collection = db.collection('tasks')
var query = { _id : id } // sets ID for query to find which task to update

  if (comp === true){
  var data = { $set: {  description : desc , isComplete : comp, dateCompleted : (new Date(Date.now()).toISOString()).split('T')[0]  }} // sets update body
  }
  else {
    data = { $set: {  description : desc , isComplete : comp, dateCompleted : 'in progress'  }} // sets update body
  }

collection.updateOne(query , data, (err , docs) => { // carries out the update
    if(err) throw err;
    res.sendStatus(204);
    client.close()
  
  });
});
}
else{ // if no ID, or ID isnt valid
  res.status(400)
    res.send({
   parameterName: 'ID',
   parameterValue: id,
   errorText: "The ID entered isn't valid"

})

}

})
app.delete('/api/delete/', function(req, res) {
  var id = parseInt(req.query.id)
  console.log(id)
  mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db('homework')
    const collection = db.collection('tasks')
    
    console.log("hey")
    
    
    collection.deleteOne({_id: id });

    
      if (err) {
        console.error(err)
        return
      }
    }) 

  })

    
app.listen(port, () => console.log(`listening on port ${port}!`)) //listener