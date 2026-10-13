class baseErrors extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
    sendErrorResponse(res) {
        res.status(this.statusCode).send({ message: this.message, statusCode: this.statusCode });
    }
}

export default baseErrors;