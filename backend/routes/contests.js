const express = require('express');
const Contest = require('../models/Contest');

const router = express.Router();

// Get all contests
router.get('/', async (req, res) => {
    try {
        const contests = await Contest.find();
        res.json(contests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Create a contest
router.post('/', async (req, res) => {
    try {
        const contest = new Contest(req.body);
        await contest.save();
        res.status(201).json(contest);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid Data' });
    }
});

module.exports = router;
