import fetch from 'node-fetch';

// Function to fetch order details from Shopify
async function fetchOrderDetails(orderId) {
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
      throw new Error(`Error fetching order details: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Order details:', data.order);
    return data.order;
  } catch (error) {
    console.error('Fetch order details error:', error);
  }
}

// Example usage
async function getOrderData(orderId) {
  try {
    const orderDetails = await fetchOrderDetails(orderId);
    // Process the order details as needed
  } catch (error) {
    console.error('Error getting order data:', error);
  }
}

// Call the function with a specific order ID
getOrderData('6243808575762');