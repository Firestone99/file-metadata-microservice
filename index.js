const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Set up CORS
app.use(cors());
// Serve static files from the public directory
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer();

// Route for handling file upload
// Route for handling file upload
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(fileInfo));
});

// Serve index.html at the root
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set up port
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
