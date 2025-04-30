const fetch = require('node-fetch');

async function updateOrderDate(orderId, customDate) {
  const apiUrl = `https://your-shop-name.myshopify.com/admin/api/2023-10/orders/${orderId}/metafields.json`;
  const accessToken = 'your-access-token';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    body: JSON.stringify({
      metafield: {
        namespace: 'custom',
        key: 'custom_order_date',
        value: customDate,
        value_type: 'string'
      }
    })
  });

  const data = await response.json();
  console.log('Metafield updated:', data);
}

// Example usage
updateOrderDate('1234567890', '2023-10-15');