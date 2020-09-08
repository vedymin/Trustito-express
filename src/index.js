const express = require("express");

const app = express();

// Local databse
let database = [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }];

// TODO:
// 1. Add POST request to save data object to database as last element, any query params can be passed
// POST /?a=1&b=2
// database = [ {a: 1, b: 2}]
// POST /?c=3&a=4
// database = [ {a: 2, b: 2}, {c: 3, a: 4}]
//
// 2. Moofiy GET request to return data object from database, based on param 'last' if it exist
// GET /?last=1 will return last item from DB
// GET /?last=2 will return 2 last items from DB
//
// 3. Add PUT request to replace data in database at curent index
// PUT /1?a=123&b=234 replaces data at index 1
// PUT /2?a=123&b=234 replaces data at index 2
//
// 4. Add DELETE request to remove data at specyfic index
// DELETE /0 remove alement ad index 0
// DELETE /1 remove alement ad index 1

app.post("/", (req, res) => {
  // query params are in req.query
  let newObject = {};
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      console.log(propName, req.query[propName]);
      newObject[propName] = req.query[propName];
    }
  }
  database.push(newObject);
  res.set("Access-Control-Allow-Origin", "*").status(200).json(database);
  // TODO error checking (emtpy res.query etc.)
  // TODO index in response for new objects
});

app.get("/", (req, res) => {
  // query params are in req.query
  let response = database;
  if (Object.keys(req.query).length !== 0) {
    response = database.slice(database.length - req.query.last);
  }

  res.set("Access-Control-Allow-Origin", "*").status(200).json(response);
});

app.put("/:id", (req, res) => {
  // query params are in req.query
  // :id is in req.params.id
  res.set("Access-Control-Allow-Origin", "*").status(200).json({});
});

app.delete("/:id", (req, res) => {
  // query params are in req.query
  // :id is in req.params.id
  res.set("Access-Control-Allow-Origin", "*").status(200).json({});
});

app.listen(8080);
