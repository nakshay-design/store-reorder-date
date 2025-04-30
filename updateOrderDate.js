import fetch from 'node-fetch';

// Function to fetch order details from Shopify
async function fetchOrderDetails(orderId) {
  const apiUrl = `https://ekta124.myshopify.com/admin/api/2023-10/orders/${orderId}.json`;
  const accessToken = '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';

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    }
  });

  const data = await response.json();
  return data.order;
}

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

// Example usage
async function processOrder(orderId) {
  try {
    const orderDetails = await fetchOrderDetails(orderId);
    const customDate = '2023-10-15'; // Replace with logic to determine the date
    await updateOrderDate(orderId, customDate);
  } catch (error) {
    console.error('Error processing order:', error);
  }
}

// Call the function with a specific order ID
processOrder('6243808575762');