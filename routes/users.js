const router = require('express').Router();

const { getUsers, getUsersById, createUser } = require('../controllers/user');

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', createUser);

module.exports = router;
