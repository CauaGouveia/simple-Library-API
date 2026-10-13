import baseErrors from "./baseErrors.js";

class castError extends baseErrors {
    constructor(message = "Invalid ID format"){
        super(message, 400);
    }
}

export default castError;