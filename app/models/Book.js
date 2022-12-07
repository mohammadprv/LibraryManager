const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    book_name: { type: String, required: true },
    author_name: { type: String, required: true },
    book_count: { type: Number, required: true, default: 0 }
});

const BookModel = mongoose.model("bookModel", bookSchema);


module.exports = {
    BookModel
}