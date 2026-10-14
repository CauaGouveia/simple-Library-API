import notFound from "../errors/notFound.js";

async function ordination(req, res, next) {
    try{
        let { limit = 5, page = 1, ordination = "_id:-1" } = req.query;

            let [orderField, order] = ordination.split(":")

            limit = parseInt(limit);
            page = parseInt(page);
            order = parseInt(order);

            const result = req.result;

            if (limit> 0 && page > 0){
                const ordinationResult = await result.find({})
                .sort({ [orderField]: order }) 
                .skip((page - 1) * limit)
                .limit(limit)
                res.status(200).json(ordinationResult);

            } else {
                next(new(notFound));
            }
        } catch(error){
            next(error);
        }
}

export default ordination;