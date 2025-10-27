
import dotenv from "dotenv";
import { app } from "./app.js";
import ConnectToMongoDB from "./db/authPage.db.js";

dotenv.config({
  path: "./.env",
});

const Port = process.env.PORT || 5000;

console.log("Starting the server");

// connect to db
ConnectToMongoDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`🚀 Server is running at PORT: ${Port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDb connection error!", err);
  });

