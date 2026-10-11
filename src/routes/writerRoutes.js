import express from "express";
import writerController from "../controllers/writerController.js";

const routes = express.Router();

routes.get("/writers", writerController.listWriter);
routes.get("/writers/:id", writerController.getWriterById);
routes.post("/writers", writerController.addWriter);
routes.put("/writers/:id", writerController.updateWriter);
routes.delete("/writers/:id", writerController.deleteWriterById);

export default routes;