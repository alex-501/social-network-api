const router = require('express').Router();

//define the routes needed
const {  getAllThoughts, getThoughtById,addThought,
   updateThought, removeThought,
     addReaction, removeReaction

     //find the path to thought-controller
    }=require('../../controllers/thought-controller');
//routes for  get & post

//use put to update thought
router 
  .route('/')
    .get(getAllThoughts)   .post(addThought)

  router
  .route('/:thoughtId')
  .get(getThoughtById) .put(updateThought) .delete(removeThought);
  
  router
    .route('/:thoughtId/reactions') .put(addReaction);
    
    router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;