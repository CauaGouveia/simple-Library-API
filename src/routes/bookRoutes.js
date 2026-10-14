import express from "express";
import bookController from "../controllers/bookController.js";
import ordination from "../middlewares/ordination.js";

const routes = express.Router();

routes.get("/books", bookController.listBooks, ordination);
routes.get("/books/search", bookController.getBooksByFilter, ordination);
routes.get("/books/:id", bookController.getBookById);
routes.post("/books", bookController.addBook);
routes.put("/books/:id", bookController.updateBook);
routes.delete("/books/:id", bookController.deleteBookById);

export default routes;