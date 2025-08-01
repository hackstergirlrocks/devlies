const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://MarieRoche:KGtk8m3VPVtUDasS@cluster0.zknco6p.mongodb.net/dev-lies';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
  .catch(error => console.error(error));