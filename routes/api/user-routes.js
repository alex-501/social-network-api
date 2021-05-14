const router = require('express').Router();


//define functions
const {
  getAllUsers,  getUserById,
  createUser,  updateUser,
  deleteUser,  addFriend,
  removeFriend
  //reuire route
} = require('./../../controllers/user-controller');



//router definition for get/post 
router
  .route('/')  .get(getAllUsers)   .post(createUser);

router
  .route('/:id') .get(getUserById)  .put(updateUser)  .delete(deleteUser);

module.exports = router; 