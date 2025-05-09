const mongoose = require('mongoose');

const creativeDaySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameTeamName: {
        type: String,
        trim: true,
        default: null
    },
    contestTeamName: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
creativeDaySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const CreativeDay = mongoose.model('CreativeDay', creativeDaySchema);

module.exports = CreativeDay;
