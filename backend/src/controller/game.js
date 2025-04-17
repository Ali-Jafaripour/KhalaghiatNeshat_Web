const Game = require('../models/game');

module.exports.getTeamName = async (req, res) => {
    try {
        const { teamName } = req.body;

        // Check if team name is provided
        if (!teamName) {
            return res.status(400).json({ 
                success: false,
                message: "لطفاً نام تیم را وارد کنید" 
            });
        }

        // Find team by name
        const team = await Game.findOne({ TeamName: teamName });

        if (team) {
            if (!team.isComplete) {
                return res.status(200).json({
                    success: true,
                    message: "این تیم وجود دارد و ظرفیت دارد",
                    isAvailable: true
                });
            }
            else{
                return res.status(200).json({
                    success: false,
                    message: "این تیم ظرفیت تکمیل است و نمی‌توانید به آن ملحق شوید",
                    isAvailable: false
                });
            }
        }
        else{
            return res.status(200).json({
                success: true,
                message: " نام تیم ازاد است و شما به عنوان سرگروه ان را ایجاد میکنید",
                isAvailable: true
            });
        }



    } catch (error) {
        console.error('Error checking team name:', error);
        return res.status(500).json({ 
            success: false,
            message: "خطای سرور در بررسی نام تیم",
            error: error.message 
        });
    }
};

