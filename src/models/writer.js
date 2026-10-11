import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {type: String, required: true},
    age: {type: Number},
    nacionality: {type: String},
}, {versionKey: false});

const writer = mongoose.model("Writers", writerSchema, "Writers");

export { writer, writerSchema };