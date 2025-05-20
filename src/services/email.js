import nodemailer from 'nodemailer'
export async function sendEmail(dest, subject, replyTo,message , attachments=[]) {
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodeMailerEmail, 
            pass: process.env.nodeMailerPassword,
        },
    });

    let info = await transporter.sendMail({
        from: `"ContactRequest" < ${process.env.nodeMailerEmail}>`, 
        to: dest, 
        subject, 
        html: message, 
         replyTo,
        attachments
    });
    return info
}
