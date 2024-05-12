/* eslint-disable import/no-extraneous-dependencies */
// pages/api/send-email.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';

export default async function sendEmail(email: string, subject: string, message: string) {
    console.log('Received email:', email);
    console.log('Received subject:', subject);
    console.log('Received message:', message);
    console.log('RECEIPIENT:', process.env.RECIPIENT_EMAIL);
    console.log('PASSWORD:', process.env.PASSWORD);
    console.log('NUMBER:', process.env.NUMBER);
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.RECIPIENT_EMAIL,
    //         pass: process.env.PASSWORD,
    //     },
    // });

    //     try {
    //         await transporter.sendMail({
    //             from: email,
    //             to: process.env.RECIPIENT_EMAIL,
    //             subject,
    //             text: message,
    //         });
    //         res.status(200).json({ success: true });
    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //         res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
    //     }
    // } else {
    //     res.status(405).json({ error: 'Method not allowed' });
}
