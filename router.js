const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getValue', (req, res, next) => {
  api.getValue(req, res, next);
});

router.post('/setUpdate', (req, res, next) => {
  api.setUpdate(req, res, next);
});

router.get('/getContentAll', (req, res, next) => {
    api.getContentAll(req, res, next);
});

router.get('/getUsers', (req, res, next) => {
    api.getUsers(req, res, next);
});

router.get('/getContentAllforKind', (req, res, next) => {
    api.getContentAllforKind(req, res, next);
});
module.exports = router;