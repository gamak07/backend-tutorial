import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";


config();
connectDB();

const app = express();

app.use("/movies", movieRoutes);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http://localhost:5001/hello



process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})
 process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
})

process.on("SIGINT", async () => {
  await disconnectDB();
  process.exit(0);
});
