const express = require('express')
const UserController = require('../controllers/User')
const router = express.Router();
router.get('/', UserController.findAll);
router.get('/:email', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);
module.exports = router