import mongoose from "mongoose";
import baseErrors from "../errors/baseErrors.js";
import castError from "../errors/castError.js";
import validationError from "../errors/validationError.js";
import notFound from "../errors/notFound.js";

// eslint-disable-next-line no-unused-vars
function errorTreatment (error, req, res, next) {
    console.log(error);
     if (error instanceof mongoose.Error.CastError) {
                    new castError().sendErrorResponse(res);
                } else if (error instanceof mongoose.Error.ValidationError) {
                    new validationError(error).sendErrorResponse(res);
                } else if (error instanceof notFound) {
                    error.sendErrorResponse(res);
                } else {
                    new baseErrors().sendErrorResponse(res);
                }
}


export default errorTreatment;