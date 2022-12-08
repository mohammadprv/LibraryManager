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

    deleteBook() {}

    updateBook() {}

}


module.exports = {
    bookController: new bookController()
}