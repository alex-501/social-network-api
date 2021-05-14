const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
//useful link to start- https://medium.com/@KLMcGrath2/mongoose-schemas-in-react-f5c0afa5a47d

//create new schema
//https://mongoosejs.com/docs/defaults.html - found it. Niceee
//https://mongoosejs.com/docs/guide.html - more helpful

const ReactionSchema = new Schema(
  {  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()},


reactionBody: {   type: String, required: true,
      trim: true,      minLength: 1,
      maxLength: 280    },

      reactionBy: {type: String,      required: true,      trim: true},
    
      createdAt: {  type: Date,
      default: Date.now,      get: createdAtVal => dateFormat(createdAtVal)}  },
  
      { toJSON: {
      getters: true }});

const ThoughtSchema = new Schema(
  {writtenBy: {  type: String, required: 'please include your a name',trim: true },

    thoughtText: {      type: String, required: 'please provide a  thought, mate',
      trim: true, minLength: 1,      maxLength: 360 },
    
      createdAt: { type: Date,
 default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)  },
    reactions: [ReactionSchema] },
    //https://mongoosejs.com/docs/tutorials/virtuals.html
  { toJSON: {
      virtuals: true, getters: true }, id: false});


      ThoughtSchema.virtual( 'reactionCount').get ( function () {
  return this.reactions.length;});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;S