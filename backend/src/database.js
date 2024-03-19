import mongoose from "mongoose";
import {URLMONGO} from './config.js';

const URI = `${URLMONGO}/EDSRP`;

mongoose
  .connect(URI)
  .then((db) => console.log("DB conectada"))
  .catch((err) => console.error(err));

mongoose.connection.on("open", function () {
  mongoose.connection.db.command({ dbStats: 1 }, function (err, result) {
  });
});
export default mongoose;
