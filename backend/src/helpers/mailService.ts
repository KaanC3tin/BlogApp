import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});


const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'user-email@gmail.com',
    subject: 'subject',
    text: "html olarak ileti"
};

export default transporter;

export const sendMail = (to: string, subject: string, text: string) => transporter.sendMail({ from: "email@email.com,", to: to, subject: subject, text: text })