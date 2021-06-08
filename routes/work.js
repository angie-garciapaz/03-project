const path = require('path');

const express = require('express');

const workController = require('../controllers/work');

const router = express.Router();

router.get('/', workController.getIndex);

router.get('/works', workController.getWorks);

router.get('/works/:workId', workController.getWork);
 
router.get('/cart', workController.getCart);

router.post('/cart', workController.postCart);

router.post('/cart-delete-item', workController.postCartDeleteWork);

router.get('/orders', workController.getOrders);

router.get('/checkout', workController.getCheckout);

// always at the end
module.exports = router;