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

router.post('/addValue', (req, res, next) => {
    api.addValue(req, res, next);
});

router.get('/getKind', (req, res, next) => {
    api.getKind(req, res, next);
});

router.post('/deleteValue', (req, res, next) => {
    api.deleteValue(req, res, next);
});

router.get('/getDeveloperBlog', (req, res, next) => {
    api.getDeveloperBlog(req, res, next);
});

router.post('/addUsers', (req, res, next) => {
    api.addUsers(req, res, next);
});

router.post('/register', (req, res, next) => {
    api.addUsers(req, res, next);
});

router.get('/selectClassification', (req, res, next) => {
    api.selectClassification(req, res, next);
});


module.exports = router;