const express = require('express');
const routes = require('./routes');
const mongodb = require('./db/connect');
const { logError, returnError } = require('./error_handling/errorHandler');

const app = express();

app.use('/', routes);
app.use(logError);
app.use(returnError);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to DB and listening on ${listener.address().port}`);
  }
});
