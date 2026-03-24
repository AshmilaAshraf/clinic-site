import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // App Password
      },
    });

    const emailHtml = `
      <h2>New Contact / Feedback Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">
        ${message}
      </blockquote>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Clinic email
      subject: `New Feedback from ${name}`,
      html: emailHtml,
    });

    return res.status(200).json({ success: true, message: 'Feedback sent.' });
  } catch (error: any) {
    console.error('Error sending feedback:', error);
    return res.status(500).json({ error: 'Failed to send feedback.', details: error.message });
  }
}
