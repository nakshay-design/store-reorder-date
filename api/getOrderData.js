import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Allow GET and OPTIONS methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header

  const { orderId } = req.query; // Get order ID from query parameters
  const apiUrl = `https://ekta124.myshopify.com/admin/api/2023-10/orders/${orderId}.json`;
  const accessToken = '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';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching order details: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data.order); // Send order details as JSON response
  } catch (error) {
    console.error('Fetch order details error:', error);
    res.status(500).json({ error: 'Error fetching order details' });
  }
}