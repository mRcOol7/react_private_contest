const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    prizePool: { type: String, required: true },
    spots: { type: Number, required: true },
    firstPrizes: { type: [String], required: true },
    validTill: { type: Date, required: true },
    platform: { type: String, required: true },
    contestCode: { type: String, required: true }
});

module.exports = mongoose.model('Contest', contestSchema);
