const express = require('express');
const router = express.Router();
const {check} = require('express-validator');   

const libraryController = require('../controllers/library-controller');

router.get('/', libraryController.getBooks);
router.get('/:bid', libraryController.getBookById);
router.post(
        '/addBook',
        [
            check('title').not().isEmpty(),
            check('author').not().isEmpty(),
            check('summary').isLength({min:5})

        ],
        libraryController.createBook
);

router.patch(
        '/updateBookById/:bid',
        [
            check('title').not().isEmpty(),
            check('author').not().isEmpty(),
            check('summary').isLength({min:5})
        ],
        libraryController.updateBookById
);
        
router.delete('/deleteBook/:bid',libraryController.deleteBookById)

module.exports = router;