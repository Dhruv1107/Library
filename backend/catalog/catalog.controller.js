const express = require('express');
const router = express.Router();
const catalogService = require('./catalog.service');

// routes
router.post('/additem', addItem);
router.post('/search', searchItems);
router.post('/release', releaseItem);
router.post('/rent', rentItem);
router.get('/', getAllItems);
router.get('/:id', getById);
router.get('/rentid/:id', reservedBooksByID);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function searchItems(req, res, next) {
    catalogService.searchItems(req.body)
        .then(search => search ? res.json(search) : res.status(400).json({ message: 'Error searching item in Catalog' }))
        .catch(err => next(err));
}

function addItem(req, res, next) {
    catalogService.addItem(req.body)
        .then(catalog => catalog ? res.json(catalog) : res.status(400).json({ message: 'Error adding item to Catalog' }))
        .catch(err => next(err));
}

function rentItem(req, res, next) {
    catalogService.rentItem(req.body)
        .then(catalog => catalog ? res.json(catalog) : res.status(400).json({ message: 'Error adding item to Catalog' }))
        .catch(err => next(err));
}

function releaseItem(req, res, next) {
    catalogService.releaseItem(req.body)
        .then(catalog => catalog ? res.json(catalog) : res.status(400).json({ message: 'Error adding item to Catalog' }))
        .catch(err => next(err));
}

function getAllItems(req, res, next) {
    catalogService.getAllItems()
        .then(catalogs => res.json(catalogs))
        .catch(err => next(err));
}

function reservedBooksByID(req, res, next) {
    catalogService.reservedBooksByID(req.params.id)
        .then(catalog => catalog ? res.json(catalog) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    catalogService.getById(req.params.id)
        .then(catalog => catalog ? res.json(catalog) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    catalogService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    catalogService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
