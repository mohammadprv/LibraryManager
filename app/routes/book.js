const { bookController } = require('../http/controllers/book.controller');

const router = require('express').Router();

//? Routes

//? Add New Book
router.post("/add-book", bookController.addBook);

//? Get Books List
router.get("/get-book-list", bookController.getBookList);

//? Delete Book
router.post("/delete-book", bookController.deleteBook);

module.exports = {
    bookRoutes: router
}