import mongoose from "mongoose";
import { writerSchema } from "./writer.js";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    publisher: { type: String },
    //enum: {       
    //values: ["Code House", "Blockbuster"]
    //message: "The publisher you want to registrate isn´t in the allowed values"
    //},
    price: { type: Number },
    pages: { type: Number,
            validate: {
                validator: (value) => {
                return value >= 10 && value <= 5000
            },
            message: "The Number of pages isn´t between 10 to 5000"
        }
     },
    writer: writerSchema  //(required)
}, { versionKey: false });

const Book = mongoose.model("Books", bookSchema, "Books");

export default Book;