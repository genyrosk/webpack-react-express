const os = require('os');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

/**
 * TODOs:
 * - configure middleware (body parser, logger)
 */
 
/**
 * API
 */
app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
);

/**
 * serve react app
 */
app.use(express.static('dist'));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
);


/**
 * production mode
 */
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, 'dist')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
  );
}

/**
 * start the server
 */
app.listen(port, () => console.log('Listening on port 8080!'));
