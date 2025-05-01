import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { orderId, date } = req.query; // Get order ID and date from query parameters
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
          value: date,
          value_type: 'string'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating order date: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json({ message: 'Date updated successfully', data });
  } catch (error) {
    console.error('Update order date error:', error);
    res.status(500).json({ error: 'Error updating order date' });
  }
}