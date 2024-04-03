const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require("dotenv")
dotenv.config()


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.SERVICE_MAIL_PASSWORD
    }
});
const verificationEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const token = crypto.randomBytes(32).toString('hex');

        if (!email)
            return res.status(500).send({
                result: false,
                message: 'Missing parameter.'
            })

        const mailOptions = {
            from: "Email Verification",
            to: email,
            subject: 'Confirm your email address',
            text: `Click on this link to verify your email: http://test.com/verify?token=${token}`,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({
                    message: 'Error sending verification email.',
                    errorMessage: error
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send({
                    result: true,
                    message: 'Verification email sended.'
                });
            }
        });
    } catch (e) {
        return res.status(500).json({
            code: e.code,
            message: e.message
        })
    }
}


module.exports = {
    verificationEmail
}