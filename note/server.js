var express= require('express');
var app= express();
var Str = require('string');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('contactlist', ['contactlist']);
app.use(bodyParser.json());
app.use(express.static(__dirname+ "/public"));


app.get('/contactlist',function (request,response) {
   db.user.find(function (err, docs) {
	   console.log('db');
    console.log(docs);
    response.json(docs);
	console.log(response);
  });

})

app.post('/contactlist', function (request, response) {
  console.log(request.body);
  db.user.insert(request.body, function(err, doc) {
    response.json(doc);
  });
});

app.delete('/contactlist/:id', function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.user.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    response.json(doc);
  });
});
app.get('/contactlist/:id', function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.user.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    response.json(doc);
  });
});

app.put('/contactlist/:id', function (request, response) {
  var id = request.params.id;
  console.log(request.body.name);
  db.user.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: request.body.name, email: request.body.email, number: request.body.number}},
    new: true}, function (err, doc) {
      response.json(doc);
    }
  );
});

app.listen(8000);
console.log("server js here");