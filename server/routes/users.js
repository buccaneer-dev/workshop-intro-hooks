const express = require('express');
const bodyParser = require('body-parser');
const requireAuth = require('../lib/require-auth');
const generateId = require('../lib/generate-id');
const generateHash = require('../lib/generate-hash');
const users = require('../fixtures/users');
exports.users = users;

const getCurrentUserRoute = (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    res.send({usertId: user.id, username: user.username, name: user.name, permissions: user.permissions});
};

const createUserRoute = async (req, res) => {
    if (req.body.password === undefined || req.body.username  === undefined) {
        res.sendStatus(400);
        return
    }
    const existing = users.find(user => user.username === req.body.username);
    if (existing) {
        res.sendStatus(403);
        return
    }

    const hashedPwd = await generateHash(req.body.password);
    const newUser = { ...req.body, id: generateId(), password: hashedPwd, permissions: ["books:read"] };
    users.push(newUser);
    res.status(201);
    res.send({ usertId: newUser.id });
};

const usersRouter = express.Router();
usersRouter.use(requireAuth);
usersRouter.get('/', getCurrentUserRoute);

exports.usersRouter = usersRouter;

const registerRouter = express.Router()
registerRouter.post('/',
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    createUserRoute);

exports.registerRouter = registerRouter;