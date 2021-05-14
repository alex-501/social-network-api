const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax


// //do the same as in thoughts
// //you could also use the match or the validate property for validation in the schema
// //you could also use the match or the validate property for validation in the schema

// example

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// var EmailSchema = new Schema({
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: 'Email address is required',
//         validate: [validateEmail, 'Please fill a valid email address'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     }
// });
// you could also use the match or the validate property for validation in the schema

// example

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// var EmailSchema = new Schema({
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: 'Email address is required',
//         validate: [validateEmail, 'Please fill a valid email address'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//     }
// });

const UserSchema = new Schema(  {
    username: 
    {  type: String, required: 'Oi! Provide a name!', trim: true },
    
    
    email: {
      type: String,
      required: 'Provide email!',

      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please include a valid email address!']},
    
      createdAt: {
      type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal)},thoughts: [
      
        {type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{  type: Schema.Types.ObjectId,
        ref: 'User'}],},


        {toJSON: {virtuals: true, getters: true},
     id: false });
//Stop Mongoose from creating _id property for sub-document array items
//https://stackoverflow.com/questions/17254008/stop-mongoose-from-creating-id-property-for-sub-document-array-items

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;});

const User = model('User', UserSchema);
module.exports = User;