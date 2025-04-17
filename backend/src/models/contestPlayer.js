const mongoose = require('mongoose');

const contestPlayerSchema = new mongoose.Schema({
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
        ref: 'contest',
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

const ContestPlayer = mongoose.model('ContestPlayer', contestPlayerSchema);

module.exports = ContestPlayer;
