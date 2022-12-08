const { bookController } = require('../http/controllers/book.controller');

const router = require('express').Router();

//? Routes

//? Add New Book
router.post("/add-book", bookController.addBook);

module.exports = {
    bookRoutes: router
}