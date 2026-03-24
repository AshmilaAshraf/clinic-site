import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { patientName, age, patientType, concern, email, phone, date, slot } = req.body;

  try {
    // 1. Setup Nodemailer transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Your Gmail App Password
      },
    });

    const tasks = [];

    // --- EMAIL TO CLINIC ---
    const clinicEmailHtml = `
      <h2>New Booking Request</h2>
      <p><strong>Patient Name:</strong> ${patientName}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Type:</strong> ${patientType}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time Slot:</strong> ${slot}</p>
      <p><strong>Concern:</strong> ${concern}</p>
    `;
    tasks.push(
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send to the clinic's own email
        subject: `New Booking: ${patientName} on ${date}`,
        html: clinicEmailHtml,
      })
    );

    // --- EMAIL TO PATIENT ---
    if (email) {
      const patientEmailHtml = `
        <h2>Booking Request Received</h2>
        <p>Hi ${patientName},</p>
        <p>Thank you for your interest in booking an appointment with Connect Speech and Rehabilitation Centre.</p>
        <p>We have received your request for <strong>${date} at ${slot}</strong>.</p>
        <p>Our clinic will contact you shortly using your provided phone number to confirm your booking and slot availability.</p>
        <br>
        <p>Best Regards,</p>
        <p>Connect Speech and Rehabilitation Centre</p>
      `;
      tasks.push(
        transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: 'Booking Request Received - Connect Speech',
          html: patientEmailHtml,
        })
      );
    }

    // Execute all pending email promises concurrently
    await Promise.all(tasks);

    return res.status(200).json({ success: true, message: 'Booking emails sent.' });
  } catch (error: any) {
    console.error('Error sending notifications:', error);
    return res.status(500).json({ error: 'Failed to send notifications.', details: error.message });
  }
}
