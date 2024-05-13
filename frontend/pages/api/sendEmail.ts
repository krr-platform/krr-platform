/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

async function helper(email: string, subject: string, message: string) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_SERVER_EMAIL,
            pass: process.env.NEXT_PUBLIC_PASSWORD,
        },
    });
    console.log(transporter);
    try {
        console.log('trying');
        const info = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_SERVER_EMAIL,
            to: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL,
            replyTo: email,
            subject: `KRR: ${subject}`,
            text: `From: ${email} \n ${message}`,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    console.log('handler');
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;
        try {
            await helper(email, subject, message);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
