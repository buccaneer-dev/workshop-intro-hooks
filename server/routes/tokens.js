const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const findUser = require("../lib/find-user");

const signature = process.env.SIGNATURE;

const createToken = (user) =>
    jwt.sign(
        { userId: user.id, permissions: user.permissions },
        signature,
        { expiresIn: process.env.EXPIREIN }
    );

const createTokenRoute = async (req, res) => {
    const credentials = req.body;
    const user = await findUser.byCredentials(credentials);
    if (user) {
        const token = createToken(user);
        res.status(201);
        res.send(token);
    } else {
        res.sendStatus(422);
    }
};

const tokensRouter = express.Router();

tokensRouter.post('/', bodyParser.json(), createTokenRoute);

module.exports = tokensRouter;