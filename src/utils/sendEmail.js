const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path') 


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "anais76@ethereal.email",
        pass: "8udFvv7P92DyyNHvb6",
    },
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
transporter.use('compile', hbs(handlebarOptions));


let sendEmailNotification = async (email, fullname, subject,params) => {
    try {
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <anais76@ethereal.email>', // sender address
            template: "email", // use a template file
            to: email, // list of receivers
            subject: subject, // Subject line
            context: {
                fullname: fullname,
                params: params,
            }

        });
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log("Error occured: %s", error.message);
    }
}

module.exports = {
    sendEmailNotification,
}