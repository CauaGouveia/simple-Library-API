import {Book} from "../models/index.js";
import {writer} from "../models/writer.js";
import notFound from "../errors/notFound.js";


class BookController {

    static async listBooks (req, res, next) {
        try{
            const searchBooks = Book.find();
            req.result = searchBooks
            next();
        } catch (error) {
            next(error);
        }
    }

    static async getBookById (req, res, next) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            const book = await Book.findById(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            next(error);
        }
    };

    static async addBook (req, res, next) {
        const newBook = req.body;
        try{
            const writerFound = await writer.findById(newBook.writer);
            const bookCompleted = { ...newBook, writer: {...writerFound._doc } };
            const book = await Book.create(bookCompleted);
            if (book) {
                res.status(201).json({ message: "Book added successfully", Book: book });
            } else{
                next(new notFound("Error in adding book"));
            }
        } catch (error) {
            next(error);
        }
    };

    static async updateBook (req, res, next) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            await Book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Book updated successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async deleteBookById (req, res, next) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            await Book.findByIdAndDelete(id);
            res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async getBooksByFilter (req, res, next) {
        try{
            const {publisher, title, nameWriter} = req.query;

            const search = {}   

            if (publisher) search.publisher = { $regex: publisher, $options: "i" };
            if (title) search.title = { $regex: title, $options: "i" };
            if(nameWriter) {
               const writerName = await writer.findOne({ name: { $regex: nameWriter, $options: "i"}});
               search.writer = writerName
            };

            const filterResult = Book.find(search).populate("writer");
            req.result = filterResult;
            next();
            
        } catch (error) {
            next(error);
        }
    }

    

};


 

export default BookController;