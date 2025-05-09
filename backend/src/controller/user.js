const creativeDay = require('../models/creativeDay');
const users = require('../models/users')
// Get user data from session and database
module.exports.getUserData = async (req, res) => {
    try {
        // Get user ID from session - assuming user is logged in
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "لطفا ابتدا وارد شوید"
            });
        }
        console.log(req.session.userId);
        // Find user data in database
        const user = await users.findOne({ _id: req.session.userId });
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "کاربر یافت نشد"
            });
        }

        // Get team names from session if available
        const gameTeamName = req.session.hasTeam || null;
        const programmingTeamName = req.session.programmingTeamName || null;

        // Return user data along with team names
        return res.status(200).json({
            success: true,
            userData: {
                name: user.firstName+" "+user.lastName,
                email: user.email,
                studentId: user.stuNumber,
                nationalId: user.nationalCode,
                sex: user.gender,
                teamName1: gameTeamName,
                teamName2: programmingTeamName
            }
        });
    } catch (error) {
        console.error('[getUserData] Error fetching user data:', error);
        return res.status(500).json({
            success: false,
            message: "خطای سرور در دریافت اطلاعات کاربر",
            error: error.message
        });
    }
};

// Update user data
module.exports.updateUserData = async (req, res) => {
    try {

        const userData = req.body;

        
        // Check if user is logged in
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "لطفا ابتدا وارد شوید"
            });
        }


        // Find user and update data
        const user = await users.findOneAndUpdate(
            { _id: req.session.userId },
            {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                stuNumber: userData.studentId,
                nationalCode: userData.nationalId,
                gender: userData.sex
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "کاربر یافت نشد"
            });
        }

        // Update team names in session
        if (userData.teamName1) {
            req.session.hasTeam = userData.teamName1;
        }
        
        if (userData.teamName2) {
            req.session.programmingTeamName = userData.teamName2;
        }

        return res.status(200).json({
            success: true,
            message: "اطلاعات با موفقیت بروزرسانی شد"
        });
    } catch (error) {
        console.error('[updateUserData] Error updating user data:', error);
        return res.status(500).json({
            success: false,
            message: "خطای سرور در بروزرسانی اطلاعات کاربر",
            error: error.message
        });
    }
};

// Finalize registration
module.exports.finalizeRegistration = async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: "لطفا ابتدا وارد شوید"
            });
        }



        // Update user to mark registration as finalized
        const user = await creativeDay.create({
            userId: userId,
            gameTeamName: "NOoooooo",
            contestTeamName:"NOoooooo",
            status:"pending",
        }
        );
        if (user){
        return res.status(200).json({
            success: true,
            message: "ثبت نام شما با موفقیت تکمیل شد"
        });}
    } catch (error) {
        console.error('[finalizeRegistration] Error finalizing registration:', error);
        return res.status(500).json({
            success: false,
            message: "خطای سرور در تکمیل ثبت نام",
            error: error.message
        });
    }
}; 