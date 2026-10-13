import notFound from "../errors/notFound.js";

function manipulation404 (req, res, next) {
    const error404 = new notFound();
    next (error404);
}

export default manipulation404;