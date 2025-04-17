const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    TeamName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamePlayer',
        required: true
      },
      members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamePlayer'
      }],
    countOfTeamMembers: {
        type: Number,
        required: true,
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    isComplete: {
        type: Boolean,
        default: false
    },

});


const Game = mongoose.model('Game', gameSchema);

module.exports = Game; 


