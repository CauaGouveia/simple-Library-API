import mongoose from "mongoose";
import { writerSchema } from "./writer.js";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    publisher: { type: String },
    price: { type: Number },
    pages: { type: Number },
    writer: writerSchema
}, { versionKey: false });

const Book = mongoose.model("Books", bookSchema, "Books");

export default Book;