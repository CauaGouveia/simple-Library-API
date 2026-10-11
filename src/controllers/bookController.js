import Book from "../models/Book.js";
import {writer} from "../models/writer.js";

class BookController {

    static async listBooks (req, res) {
        try{
            const allBooks = await Book.find({});
            res.status(200).json(allBooks);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to retrieve books` });
        }
    }

    static async getBookById (req, res) {
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
            res.status(500).json({ message: `${error.message} - Failed to retrieve book` });
        }
    };

    static async addBook (req, res) {
        const newBook = req.body;
        try{
            const writerFound = await writer.findById(newBook.writer);
            const bookCompleted = { ...newBook, writer: {...writerFound._doc } };
            const book = await Book.create(bookCompleted);
            res.status(201).json({ message: "Book added successfully", Book: book });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to add book` });
        }
    };

    static async updateBook (req, res) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            await Book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Book updated successfully" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to update book` });
        }
    }

    static async deleteBookById (req, res) {
        try{
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Book ID is required" });
            }
            await Book.findByIdAndDelete(id);
            res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to delete book` });
        }
    }

    static async getBooksByPublisher (req, res) {
        try{
            const publisher = req.query.publisher;
            if (!publisher) {
                return res.status(400).json({ message: "Publisher is required" });
            }
            const booksByPublisher = await Book.find({ publisher: { $regex: publisher, $options: "i" } });
            if (booksByPublisher) {
                res.status(200).json(booksByPublisher);
            } else {
                res.status(404).json({ message: "No books found for this publisher" });
            }
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Failed to retrieve books by publisher` });
        }
    }

    

};


 

export default BookController;