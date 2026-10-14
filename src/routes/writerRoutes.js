import express from "express";
import writerController from "../controllers/writerController.js";
import ordination from "../middlewares/ordination.js";

const routes = express.Router();

routes.get("/writers", writerController.listWriter, ordination);
routes.get("/writers/:id", writerController.getWriterById);
routes.post("/writers", writerController.addWriter);
routes.put("/writers/:id", writerController.updateWriter);
routes.delete("/writers/:id", writerController.deleteWriterById);

export default routes;