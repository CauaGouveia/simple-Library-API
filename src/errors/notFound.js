import baseErrors from "./baseErrors.js";

class notFound extends baseErrors {
   constructor(message = "Page not found") {
       super(message, 404);
   }
}

export default notFound;