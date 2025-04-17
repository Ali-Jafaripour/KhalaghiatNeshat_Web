const mongoose = require('mongoose');

const gamePlayerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game',
        required: true,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    hasTeam: {
        type: Boolean,
        default: false
    },
});

const gamePlayer = mongoose.model('gamePlayer', gamePlayerSchema);

module.exports = gamePlayer;




