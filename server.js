//copy from activity mostly
const express = require('express');
const path = require('path');

const app = express();
//Port to run app on (and declare listener)
const PORT = process.env.PORT || 8000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// fixed path to static resources and files
app.use(express.static(path.join(__dirname, 'app/public')));

//routes location
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

//Lasp part is to launch the listener

app.listen(PORT, function() {
  console.log('Applicaton listening on PORT: ' + PORT);
});
