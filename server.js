import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Function to update the order date in a metafield
async function updateOrderDate(orderId, customDate) {
  const apiUrl = `https://ekta124.myshopify.com/admin/api/2023-10/orders/${orderId}/metafields.json`;
  const accessToken = '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';

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
        value: customDate,
        value_type: 'string'
      }
    })
  });

  const data = await response.json();
  console.log('Metafield updated:', data);
}

// Endpoint to trigger the update
app.get('/update-order-date', async (req, res) => {
  const orderId = req.query.orderId; // Get order ID from query parameters
  const customDate = new Date().toISOString().split('T')[0]; // Use current date

  try {
    await updateOrderDate(orderId, customDate);
    res.send('Order date updated successfully');
  } catch (error) {
    console.error('Error updating order date:', error);
    res.status(500).send('Error updating order date');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});