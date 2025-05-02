import fetch from 'node-fetch';
import cron from 'node-cron';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { orderId, date, customerEmail } = req.query; // Get order ID, date, and customer email from query parameters

  // Ensure the date is in the correct format (YYYY-MM-DD)
  const formattedDate = new Date(date).toISOString().split('T')[0];

  const apiUrl = `https://ekta124.myshopify.com/admin/api/2023-10/orders/${orderId}/metafields.json`;
  const accessToken = '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';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({
        metafield: {
          namespace: 'custom',
          key: 'reorder_date',
          value: formattedDate,
          value_type: 'string'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error updating order date: ${response.status} ${response.statusText} - ${errorText}`);
      res.status(response.status).json({ error: `Error updating order date: ${errorText}` });
      return;
    }

    const data = await response.json();
    res.status(200).json({ message: 'Date updated successfully', data });

    // Schedule email reminder
    const reminderDate = new Date(date);
    const cronExpression = `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${reminderDate.getMonth() + 1} *`;

    cron.schedule(cronExpression, () => {
      sendReminderEmail(customerEmail, orderId);
    });

  } catch (error) {
    console.error('Update order date error:', error);
    res.status(500).json({ error: 'Error updating order date' });
  }
}

// Function to send reminder email
function sendReminderEmail(email, orderId) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'magento125@gmail.com',
      pass: 'velv cowb ycax iact'
    }
  });

  const mailOptions = {
    from: 'magento125@gmail.com',
    to: email,
    subject: 'Order Reminder',
    text: `This is a reminder for your order with ID: ${orderId}.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}