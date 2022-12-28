const express = require('express');
const cors = require('cors');
const DataBase = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
const db = new DataBase('./src/db/database.db', {
  verbose: console.log,
});

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  const query = db.prepare('SELECT * FROM movies');
  const moviesDB = query.all();
  console.log(req);
  console.log(res);
  res.json({
    success: true,
    movies: moviesDB,
  });
});

server.post('/login', (req, res) => {
  const query = db.prepare('SELECT * FROM users');
  const usersDB = query.all();
  // console.log(req.body);
  res.json({
    success: true,
    movies: usersDB,
  });
});

server.get('/movie/:movieId', (req, res) => {
  const foundMovie = db.prepare('SELECT * FROM users WHERE id = ?');
  const movieInclude = foundMovie.get(req.params.movieId);
  res.json({
    success: true,
    users: movieInclude,
  });
});

server.post('/sign-up', (req, res) => {
  const queryInclude = db.prepare('SELECT * FROM users WHERE email = ?');
  const userInclude = queryInclude.get(req.body.email);

  if (userInclude === undefined) {
    const query = db.prepare(
      'INSERT INTO users(email, password) VALUES (? , ?)'
    );
    const result = query.run(req.body.email, req.body.password);
    res.json({
      success: true,
      users: result,
    });
  } else {
    res.json({
      success: false,
      errorMessage: 'Usuaria ya existente',
    });
  }
});

//Cuando creamos un servidor estático, la ruta la tenemos que añadir desde la raíz del proyecto, no desde el archivo donde lo escribamos.

//html
const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));

//imagenes
const staticServerPathImages = './src/public-movies-images';
server.use(express.static(staticServerPathImages));
