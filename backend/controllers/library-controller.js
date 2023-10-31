const mongoose = require('mongoose');
const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const Book = require('../models/book');

// For creating book
const createBook = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        next(new HttpError('Invalid inputs passed. Check length of each field and try again...', 422));
    }
    // console.log("dsfs"+req.body.title);
    const {title, author, summary} = req.body;
    
    const createdBook = new Book({
        title,
        author,
        summary
    });
    try{
        await createdBook.save();
    }catch(err){
        const error = new HttpError('Couldnt add book',500);
        return  next(error);
    }

    res.status(201).json({book: createdBook});
}

// For getting the list of all the books in the library
const getBooks = async(req, res, next)=>{
    console.log("get request for all the books");
    let books;
    try{
        books = await Book.find({});
    }catch(err){
        const error = new HttpError('Couldnt get books',500);
        return  next(error);
    }
    console.log(books);
    res.status(201).json({books})
    // res.json({books: books.toObject({getters: true})});
}

// For getting a book details with a specific id
const getBookById = async(req, res, next)=>{
    console.log("get request by id");
    const bid = req.params.bid;
    console.log(bid);
    let book;
    try{
        book = await Book.findById(bid);
    }catch(err) {
        const error = new HttpError('Book Fetching unsuccessful',500);
        return next(error);
    }

    if(!book){
        const error =  new HttpError('Could not find a book for the given id.',404);
        return next(error);
    }
    res.json({book: book.toObject({getters: true})});
}

// For updating a book by it's id
const updateBookById = async(req, res, next)=>{
    console.log("in patch request");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next (new HttpError('Invalid inputs passed. Check length of each field and try again...',422));
    }
    const bid = req.params.bid;
    console.log(bid);
    const {title, author, summary} = req.body;
    let book;
    try{
        book = await Book.findById(bid);
    }catch(err) {
        const error = new HttpError('Couldnt update book',500);
        return next(error);
    }
    if(!book){
        const error =  new HttpError('Could not find a book for the given id.',404);
        return next(error);
    }
    book.title = title;
    book.author = author;
    book.summary = summary;

    try{
        await book.save();
    }catch(err){
        const error = new HttpError('Couldnt update book',500);
        return  next(error);
    }

    res.status(200).json({book:book.toObject({getters:true})});

}

// For deleting a book by it's id
const deleteBookById = async(req, res, next)=>{
    console.log("in delete ");
    const bid = req.params.bid;
    console.log(bid) ;
    let book;
    try{
        book = await Book.findById(bid);
    }catch(err){
        const error = new HttpError('Error in deleting book',500);
        return next(error);
    }
    console.log(book);
    if(!book){
        const error = new HttpError('Couldnt find book for the given id',404);
        return next(error);
    }

    try{
        await book.deleteOne();
    }catch(err){
        const error = new HttpError('Couldnt delete book',500);
        return  next(error);
    }
    res.status(200).json({message:'Dleted book'});
}

exports.createBook = createBook;
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;