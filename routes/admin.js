const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-work', adminController.getAddWork);

router.get('/works', adminController.getWorks);

router.post('/add-work', adminController.postAddWork);

router.get('/edit-work/:workId', adminController.getEditWork);

router.post('/edit-work', adminController.postEditWork);

router.post('/delete-work', adminController.postDeleteWork);

module.exports = router;