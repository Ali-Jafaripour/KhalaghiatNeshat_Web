const express = require('express');
const router = express.Router();
const CreativeDay = require('../models/creativeDay');
const gameController = require("../controller/game")
const contestController = require("../controller/contest")
const userController = require('../controller/user');

router.get('/count', async (req, res) => {
  console.log('[creativeDay/count] Fetching approved creative days count');
  try {
    const count = await CreativeDay.countDocuments({ status: 'approved' }); 
    console.log(`[creativeDay/count] Found ${count} approved creative days`);
    res.json({ count });
  } catch (err) {
    console.error(`[creativeDay/count] Error fetching count:`, err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/game/getGameTeamNameMember", gameController.getGameTeamNameMember);
router.post("/game/save-step", gameController.saveStep);
router.post("/contest/getContestTeamNameMember", contestController.getContestTeamNameMember);
router.post("/contest/save-step", contestController.saveStep);

// User routes
router.get('/user/getUserData', userController.getUserData);
router.post('/user/updateUserData', userController.updateUserData);
router.post('/user/finalizeRegistration', userController.finalizeRegistration);

console.log(`[creativeDay] Routes loaded successfully`);

module.exports = router;