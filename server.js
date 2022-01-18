const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const PORT = 8000;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routing
app.use(routes);

// Create a server
const server = http.createServer(app);

// Run my server
const serverStart = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`server is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

serverStart();