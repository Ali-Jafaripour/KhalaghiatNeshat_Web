const creativeDay = require('../models/creativeDay');

module.exports.getContestTeamNameMember = async (req, res) => {
    try {
        const { teamName } = req.body;
        console.log(`[getContestTeamNameMember] teamName received:`, teamName);

        // Check if team name is provided
        if (!teamName) {
            console.warn(`[getContestTeamNameMember] No teamName provided.`);
            return res.status(400).json({ 
                success: false,
                message: "لطفاً نام تیم را وارد کنید" 
            });
        }

        // شمارش تعداد اعضای تیم
        const memberCount = await creativeDay.countDocuments({ contestTeamName: teamName });
        console.log(`[getContestTeamNameMember] memberCount for '${teamName}':`, memberCount);

        if (memberCount >= 4) {
            console.info(`[getContestTeamNameMember] Team '${teamName}' is full.`);
            return res.status(200).json({
                success: false,
                message: "این تیم ظرفیت تکمیل است و نمی‌توانید به آن ملحق شوید",
                isAvailable: false
            });
        } else if (memberCount > 0) {
            console.info(`[getContestTeamNameMember] Team '${teamName}' exists and has capacity.`);
            return res.status(200).json({
                success: true,
                message: "این تیم وجود دارد و ظرفیت دارد",
                isAvailable: true
            });
        } else {
            console.info(`[getContestTeamNameMember] Team '${teamName}' is available for creation.`);
            return res.status(200).json({
                success: true,
                message: "نام تیم آزاد است و شما به عنوان سرگروه آن را ایجاد می‌کنید",
                isAvailable: true
            });
        }
    } catch (error) {
        console.error('[getContestTeamNameMember] Error checking team name:', error);
        return res.status(500).json({ 
            success: false,
            message: "خطای سرور در بررسی نام تیم",
            error: error.message 
        });
    }
};

module.exports.saveStep = async (req, res) => {
    try {
        const { contest, programmingTeamName } = req.body;
        console.log(`[contest saveStep] Saving to session: contest=`, contest, ', programmingTeamName=', programmingTeamName);

        // ذخیره اطلاعات در session
        req.session.contest = contest;
        req.session.programmingTeamName = programmingTeamName;

        return res.status(200).json({
            success: true,
            message: "اطلاعات با موفقیت در نشست ذخیره شد"
        });
    } catch (error) {
        console.error('[contest saveStep] Error saving step:', error);
        return res.status(500).json({
            success: false,
            message: "خطای سرور در ذخیره اطلاعات نشست",
            error: error.message
        });
    }
};
