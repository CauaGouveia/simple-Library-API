import express from "express";
import Books from  "./bookRoutes.js";
import Writers from "./writerRoutes.js";

const routes = (app) => {
    app.route ("./").get((req, res) => res.status(200).send("Landing Page for my API classes" ));
    app.use(express.json(), Books, Writers);
}

export default routes;