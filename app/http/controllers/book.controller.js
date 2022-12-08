const { BookModel } = require("../../models/Book");

class bookController {

    async addBook(req, res, next) {
        try {
            const { book_name, author_name, book_count } = req.body;
            const duplicatedBook = await BookModel.findOne({ book_name });
            if(!duplicatedBook) {
                const result = await BookModel.create({ book_name, author_name, book_count });
                if(result) {
                    return res.status(200).json({
                        status: 200,
                        success: true,
                        message: `${book_name} Added SuccessFully`
                    });
                }
            }else {
                const bookCount = duplicatedBook.book_count + book_count;
                const result = await BookModel.updateOne({ book_name }, {$set: { book_count: bookCount }});
                if(result.modifiedCount > 0) {
                    return res.status(200).json({
                        status: 200,
                        success: false,
                        message: `The ${book_name} has already exist, book Count has increased.`,
                        book_count: bookCount
                    });
                }
                throw { status: 500, success: false, message: "Error" };
            }
        } catch (error) {
            next(error);
        }
    }

    async getBookList(req, res, next) {
        try {
            const booksList = await BookModel.find({});
            if(booksList.length < 1) return res.status(200).json({ status: 200, success: true, message: "No Records In Database" });
            return res.status(200).json(booksList);
        } catch (error) {
            next(error);
        }
    }

    async deleteBook(req, res, next) {

        try {
            const { book_name, delete_count } = req.body;
        
            const book = await BookModel.findOne({ book_name });
            if(!book) return res.json({ status: 200, success: true, message: `${book_name} Does Not Exist.` });
            let book_count = book.book_count;
            const remaining_count = book_count - delete_count;
            if(remaining_count < 0) return res.json({ status: 200, success: false, message: "Delete-Count Must Be Less-Equal Than Book-Count", book_count});
            if(remaining_count == 0) {
                const result = await BookModel.deleteOne({ book_name });
                if(result.deletedCount > 0) return res.status(200).json({ status: 200, success: true, message: `${book_name} Completely Remove.` });
            }
            book_count = book_count - delete_count;
            const result = await BookModel.updateOne({ book_name }, {$set: { book_count }});
            if(result.modifiedCount > 0) return res.status(200).json({ status: 200, success: false, message: `${delete_count} Numbers Of ${book_name} Were Removed.`, remaining_count: book_count});
        } catch (error) {
            next(error)
        }

    }

    updateBook() {}

}


module.exports = {
    bookController: new bookController()
}