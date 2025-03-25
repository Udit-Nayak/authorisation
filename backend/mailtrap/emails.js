import transporter from "../db/nodemailer.js";
import {VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplate.js"

export const sendVerificationEmail=async (email,verificationToken) => {
    const recipient=email;
    try {
        const response=await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:recipient,
            subject:"Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Email sent successfully",response);

    } catch (error) {

        console.error(`Error sending verication`, error);
        throw new Error(`Error sending verification email: ${error}`); 

    }

}

export const sendWelcomeEmail=async(email,name)=>{
    const recipient=email;
    try {

        const response=await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:recipient,
            subject:"WELCOME TO THE AUTH",
            text:"Welcome to the auth. your have be great.",
        })
        console.log("Welcome email sent successfully",response);


    } catch (error) {
        console.error(`Error sending welcome email`,error);
        throw new Error(`Error sending welcome email: ${error}`);        
    }
}

export const sentResetPasswordEmail = async (email, actualresetURL) => {
    const recipient = email;
    const emailHTML = PASSWORD_RESET_REQUEST_TEMPLATE.replace(/\{\{resetURL\}\}/g, actualresetURL);

    try {
        const response = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: recipient,
            subject: "Reset Your Password",
            html: emailHTML,
            text: `Reset your password by visiting this link: ${actualresetURL}`,
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};



export const sentResetSuccessEmail=async(email)=>{
    const recipient=email;
    try {
        const response = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: recipient,
            subject: "Password reset successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });

        console.log("Password reset email sent successfully",response);
    } catch (error) {
        console.error(`Error sending password reset sucsess email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);      
    }
}