import mongoose from "mongoose";

mongoose.set("debug", true);

let dbQueryCount = 0;

mongoose.set("debug", (collectionName, method, query, doc) => {
  dbQueryCount++;
});

const URI = "mongodb://127.0.0.1/EDSRP";

mongoose
  .connect(URI)
  .then((db) => console.log("DB conectada"))
  .catch((err) => console.error(err));

mongoose.connection.on("open", function () {
  mongoose.connection.db.command({ dbStats: 1 }, function (err, result) {
  });
});
export default mongoose;
