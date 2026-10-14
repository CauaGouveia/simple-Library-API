import {writer} from "../models/index.js";
import notFound from "../errors/notFound.js";

class WriterController {

    static async listWriter (req, res, next) {
        try{
            const allWriters =  writer.find({});
            req.result = allWriters;
            next();
        } catch (error) {
            next(error);
        }
    }

    static async getWriterById (req, res, next) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Writer ID is required" });
            }
            const writerById = await writer.findById(id);
            if (writerById) {
                res.status(200).json(writerById);
            } else {
                next(new notFound("Writer not found"));
            }
        } catch (error) {
           next (error);
        }
    };

    static async addWriter (req, res, next) {
        try{
            const newWriter = await writer.create(req.body);
            res.status(201).json({ message: "Writer added successfully", Writer: newWriter });
        } catch (error) {
            next(error);
        }
    };

    static async updateWriter (req, res, next) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Writer ID is required" });
            }
            await writer.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Writer updated successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async deleteWriterById (req, res, next) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Writer ID is required" });
            }
            await writer.findByIdAndDelete(id);
            res.status(200).json({ message: "Writer deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

};


 

export default WriterController;