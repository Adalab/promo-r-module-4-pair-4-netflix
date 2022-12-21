const express = require('express');
const cors = require('cors');
const moviesJson = require('../web/src/data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  console.log(req);
  console.log(res);
  res.json({
    success: true,
    movies: moviesJson,
  });
});

//Cuando creamos un servidor estático, la ruta la tenemos que añadir desde la raíz del proyecto, no desde el archivo donde lo escribamos.

//html
const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));

//imagenes
const staticServerPathImages = './src/public-movies-images';
server.use(express.static(staticServerPathImages));
