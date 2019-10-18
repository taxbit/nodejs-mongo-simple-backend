const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cookieParser());

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    const { jwt } = req.cookie.jwt;

    if (!jwt) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }

    let payload;

    try {
        payload = jwt.verify(jwt, JWT_SECRET);
    } catch (err) {
        return res
            .status(401)
            .send({ message: 'Необходима авторизация' });
    }

    req.user = payload;
    next();

};