const send = require("../services/nodemailer")

const sendMail = async (req, res) => {
    const { to, subject, body} = req.body;
    send(to, subject, body)
    return res.json("E-mail enviado com sucesso!")
}

module.exports = {
    sendMail
}