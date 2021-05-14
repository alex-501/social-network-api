const { User, Thought } = require('../models');
///////////////////////////////////////
//https://mongoosejs.com/docs/populate.html
///look at saving refs section
const userController = {
  getAllUsers(req, res) 
  {    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'    })
      //populate  w. path
        .populate({
        path: 'friends',
        select: '-__v'})

      .select('-__v')
      
     .sort({ _id: -1 })
      
        .then(dbUserData => res.json(dbUserData))
      
         .catch(err => {
        console.log(err);
        res.status(400).json(err);});},


        getUserById({ params }, res)

        {  User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'     })

        .populate({
        path: 'friends',
        select: '-__v'      })

      .select('-__v')

      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData); })

      .catch(err => {
        console.log(err);
        res.status(400).json(err); });
            },

  //https://www.codota.com/code/javascript/functions/express/Router/delete 
//create the user function
  createUser({ body }, res) {
    console.log("this is the body", body)
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));  },


      updateUser({ params, body }, res) 
      { User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      
      .then(dbUserData =>
         {if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;}

        res.json(dbUserData);})
      .catch(err => res.status(400).json(err));},


  //delete user function
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;}

        if (dbUserData.thoughts && dbUserData.thoughts.length > 0) {
          console.log(" confirmed ", dbUserData.thoughts)
          return Thought.deleteMany(
            { _id: {$in: dbUserData.thoughts } }   )
        } else return dbUserData;})

      .then(dbThoughtData => {
        console.log("confirmed", dbThoughtData)
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

//delete friend function

     removeFriend({ params }, res) {
    console.log("delete friend ", params)

    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      console.log("delete friend from db ", dbUserData)
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  }

}

module.exports = userController;