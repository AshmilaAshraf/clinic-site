// Utility functions for interacting with our Vercel Serverless backend.

/**
 * Submits a new booking to the backend, which will securely dispatch 
 * the necessary emails and SMS via Nodemailer and Twilio.
 */
export const submitBooking = async (bookingData: {
  patientName: string;
  age: string;
  patientType: string;
  concern: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
}) => {
  const response = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit booking. Check backend logs.');
  }

  return response.json();
};

/**
 * Submits a new contact/feedback form securely.
 */
export const submitFeedback = async (feedbackData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedbackData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit feedback. Check backend logs.');
  }

  return response.json();
};
