const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.SERVICE_MAIL_PASSWORD,
    }
});
const verificationEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const token = crypto.randomBytes(32).toString('hex');

        const mailOptions = {
            from: "Email Verification",
            to: email,
            subject: 'Confirm your email address',
            text: `Click on this link to verify your email: http://test.com/verify?token=${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    message: 'Error sending verification email.',
                    serviceMail: process.env.SERVICE_MAIL,
                    password:process.env.SERVICE_MAIL_PASSWORD
                });
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Verification email sent.');
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