const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://onlygutsdev:Ruv4yXT0XQDZ0QvA@cluster0.7xogjra.mongodb.net/dev-lies';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
  .catch(error => console.error(error));