const Application = require('./app/server');

const DB_URI = "mongodb://localhost:27017/LibraryManager_db";

new Application(DB_URI, 3000);