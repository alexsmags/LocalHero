const mongoose = require('mongoose');
const MONGO_URI ="mongodb+srv://admin:localheroadmin@localhero-main-cluster.ps00t.mongodb.net/LocalHeroDB?retryWrites=true&w=majority&appName=localhero-main-cluster"

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState == 1) {
      console.log('Database Connected');
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};
module.exports = connectMongo;
