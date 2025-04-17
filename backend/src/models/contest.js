const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    TeamName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContestPlayer',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContestPlayer'
    }],
    countOfTeamMembers: {
        type: Number,
        required: true,
        default: 1
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;
