const router = require('express').Router();
const {
  getUsers, getUsersById, patchUserInfo, patchUserAvatar,
} = require('../controllers/user');


router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
