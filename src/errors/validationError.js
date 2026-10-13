import castError from "./castError.js";

class validationError extends castError {
    constructor(error){
        const errorMessages = Object.values(error.errors).map(error => error.message);
        super(`Validation error: ${errorMessages.join(", ")}`, 400);
    }
}

export default validationError;