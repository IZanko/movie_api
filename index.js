/*jshint esversion: 6*/
const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

// Empty array of users
let users = [
  {
    username: "",
    email: "",
    favorites: {}
  }
];
let movies = [];
let message = "";

//  Return a list of ALL movies to the user
app.get("/movies", (req, res) => {
  message = "A JSON object containing data of all movies";
  res.status(201).send(message);
});

// Return data about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
  message =
    "A JSON object containing data of a movie titled '" +
    req.params.title +
    "'";
  res.status(201).send(message);
});

// Return data about a genre (e.g.,“Thriller”)
app.get("/movies/genre/:genre", (req, res) => {
  message =
    "A JSON object containing data of all movies with genre '" +
    req.params.genre +
    "'";
  res.status(201).send(message);
});

// Return data about a director (bio, birth year, death year) by name
app.get("/movies/directors/:director", (req, res) => {
  message =
    "A JSON object containing data of director '" + req.params.director + "'";
  res.status(201).send(message);
});

// Allow new users to register
app.post("/:username", (req, res) => {
  let newUser = req.params.username;

  if (!newUser) {
    message = "Missing name";
    res.status(400).send(message);
  } else {
    users.push(newUser);
    message = "	New user " + newUser + " has registered. Welcome!";
    res.status(201).send(message);
  }
});

// Allow users to update their user info (username)
app.put("/:username", (req, res) => {
  let newUsername = req.params.username;

  if (!newUsername) {
    message = "Missing name . . .";
    res.status(400).send(message);
  } else {
    users.name = newUsername;
    message = "Your new username is " + newUsername;
    res.status(201).send(message);
  }
});

//Return a list of user's favorite movies
app.get("/username/favorites", (req, res) => {
  message = "A JSON object containing data of all favorited movies";
  res.status(201).send(message);
});

//Allow users to add a movie to their list of favorites
app.post("/username/favorites/:title", (req, res) => {
  message = "	Movie " + req.params.title + " was added to your favorites";
  res.status(201).send(message);
});

// Allow users to remove a movie from their list of favorites
app.delete("/username/favorites/:title", (req, res) => {
  message =
    "	Movie " + req.params.title + " was removed from your list of favorites";
  res.status(201).send(message);
});

//Allow existing users to deregister
app.delete("/username", (req, res) => {
  let deleteUser = req.body;
  message =
    "Your email '" +
    deleteUser.email +
    "' and username '" +
    deleteUser.username +
    "' have been removed from our records";
  res.status(201).send(message);
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
