import {writer} from "../models/writer.js";

class WriterController {

    static async listWriter (req, res) {
        try{
            const allWriters = await writer.find({});
            res.status(200).json(allWriters);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to retrieve writers` });
        }
    }

    static async getWriterById (req, res) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Writer ID is required" });
            }
            const writer = await writer.findById(id);
            if (writer) {
                res.status(200).json(writer);
            } else {
                res.status(404).json({ message: "Writer not found" });
            }
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to retrieve writer` });
        }
    };

    static async addWriter (req, res) {
        try{
            const newWriter = await writer.create(req.body);
            res.status(201).json({ message: "Writer added successfully", Writer: newWriter });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to add writer` });
        }
    };

    static async updateWriter (req, res) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Writer ID is required" });
            }
            await writer.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Writer updated successfully" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to update writer` });
        }
    }

    static async deleteWriterById (req, res) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Writer ID is required" });
            }
            await writer.findByIdAndDelete(id);
            res.status(200).json({ message: "Writer deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to delete writer` });
        }
    }

};


 

export default WriterController;