import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorTreatment from "./middlewares/errorTreatment.js";
import manipulation404 from "./middlewares/404manipulation.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Database connection error:", error);
});

connection.once("open", () => {
    console.log("Database connected successfully");
});

const app = express();
routes(app);

app.use(manipulation404);

app.use(errorTreatment);

export default app;