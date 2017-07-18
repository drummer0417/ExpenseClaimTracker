var express = require('express');

// Create our app
var app = express();
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  if(req.headers['x-forwarded-proto'] === 'https') {
    // console.log('is https');
    res.redirect('http://' + req.hostname + req.url);
  } else {
    // console.log('is not https');
    next();
  }
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log(`Express server is up on port ${port}`);
});
