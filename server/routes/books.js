const express = require('express');
const bodyParser = require('body-parser');
const requireAuth = require('../lib/require-auth');
const generateId = require('../lib/generate-id');
const enforce = require('../lib/enforce');
const books = require('../fixtures/books');

const stringify = require('csv-stringify');

const getBooksRoute = (req, res) => {
    const sorted = books.sort((a, b) => a.title.localeCompare(b.title))
    res.format({
        'text/csv': function () {
            const formatUsers = [Object.keys(sorted[0]), ...sorted.map(i => Object.values(i))]
            stringify(formatUsers, (_, output) => {
                res.end(output);
            });
        },
        'application/json': function () {
            res.send(sorted);
        },
        'default': function () {
            res.sendStatus(406);
            return;
        }
    });
};

const defaultFields = {
    title: "",
    subtitle: "",
    author: "",
    description: "",
    link: "",
    borrowed: ""
}

const createBookRoute = async (req, res) => {
    const newBook = { ...defaultFields, ...req.body, id: generateId() };
    try {
        req.authorize(newBook);
        books.push(newBook);
        res.status(201);
        res.send(newBook);
    } catch (e) {
        res.sendStatus(403);
    }
};

const updateBookRoute = async (req, res) => {
    const book = books.find(book => book.id === req.params.id);
    try {
        req.authorize(book);
        Object.assign(book, req.body);
        res.send(book);
    } catch (e) {
        res.sendStatus(403);
    }
};

const deleteBookRoute = (req, res) => {
    const book = books.find(book => book.id === req.params.id);
    try {
        req.authorize(book);
        const index = books.findIndex(book => book.id === req.params.id);
        if (index === -1){
            res.sendStatus(404);
            return;
        }
        books.splice(index, 1);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(403);
    }
};

const createBookPolicy = (user, _) => user.permissions.includes("books:create");
const updateBookPolicy = (user, book) => book.borrowed === "" || user.username == book.borrowed;
const deleteBookPolicy = (user, _) => user.permissions.includes("books:delete");


const booksRouter = express.Router();
booksRouter.use(requireAuth);
booksRouter.route('/:id')
    .patch(
        enforce(updateBookPolicy),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        updateBookRoute)
    .delete(
        enforce(deleteBookPolicy),
        deleteBookRoute);

booksRouter.route('/')
    .get(getBooksRoute)
    .post(
        enforce(createBookPolicy),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        createBookRoute
    );

module.exports = booksRouter;