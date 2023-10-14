const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

let db;

const initDb = (callback) => {
  if (db) {
    console.log('DB is already initialized!');
    return callback(null, db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      db = client;
      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
  return true;
};

const getDb = () => {
  if (!db) {
    throw Error('DB not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb,
};
