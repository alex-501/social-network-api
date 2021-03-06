//require models
const { Thought, User } = require('../models');
const thoughtController = {
//GET all 
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err); });},

  //create new thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => 
      {  return User.findOneAndUpdate( { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true });})

      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'ERROR - ID not Found!' });
          return;}

        res.json(dbUserData);})

      .catch(err => res.json(err));},

    getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'ERROR - ID not Found' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateThought({ params, body }, res) 
  {  Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
   
  .then(dbThoughtData => {

        if (!dbThoughtData) {
          res.status(404).json({ message: 'ERROR - ID not Found' });
          
          return; }

          res.json(dbThoughtData); })
      .catch(err => res.status(400).json(err));},

  // delete thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => 

        {if (!deletedThought) {
          return res.status(404).json({ message: 'ERROR - ID not Found' });}
        res.json(deletedThought); })
      
      .catch(err => res.json(err));},

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(     { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'ERROR - ID not Found' });
          return; }
        res.json(dbThoughtData);})

      .catch(err => res.json(err));},

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate
    ( { _id: params.thoughtId },
      { $pull: {reactions: {reactionId:params.reactionId } } },
      { new: true })

      .then(dbThoughtData => {    if(!dbThoughtData) 
         {  res.status(404).json({ message: 'ERROR - ID not Found' });
          
         
         return;}

        res.json(dbThoughtData); })

      .catch(err => res.json(err)); }};


module.exports = thoughtController;