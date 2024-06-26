const { connect, connection } = require("mongoose");

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/networkDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// This is the other example to connect the mongoose

// mongoose.connect('mongodb://127.0.0.1:27017/networkDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

module.exports = connection;
