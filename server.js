const mongoose = require("mongoose");
const config = require("./src/config");
const app = require("./app");

process.on("uncaughtException", (error) => {
  process.exit(1);
});

async function db() {
  try {
    const uri = `mongodb+srv://${config.db_user}:${config.db_pass}@friends.vcgmji7.mongodb.net/friends_assignment?retryWrites=true&w=majority&appName=friends`;

    await mongoose.connect(uri);

    server = app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to connect to database! Error:  ", error);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

db();
