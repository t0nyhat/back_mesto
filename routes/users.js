const router = require('express').Router();

const {
  getUsers, getUsersById, createUser, patchUserInfo, patchUserAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUsersById);
router.patch('/me', patchUserInfo);
router.patch('/avatar', patchUserAvatar);
module.exports = router;
