const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass:  process.env.MAIL_PASS
    }
});

const send = (to: any, subject: any, body: any) => {
    transporter.sendMail({
        from: process.env.MAIN_FROM,
        to,
        subject,
        text: body
    })
}   

module.exports = send;