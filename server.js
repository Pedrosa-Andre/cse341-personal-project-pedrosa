const express = require('express');
const routes = require('./routes');
const objectsRoutes = require('./routes/objects');
// const studentsRoutes = require('./routes/students');
const mongodb = require('./db/connect');

const app = express();

app.use('/', routes);
app.use(objectsRoutes);
// app.use(studentsRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
