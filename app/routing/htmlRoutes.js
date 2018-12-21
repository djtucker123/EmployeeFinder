// from server .js
var path = require('path');

module.exports = function(app) {

//survey path link
  app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, '/../public/survey.html'));
  });

  // all paths other than survey revert to home page
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../public/home.html'));
  });

};
