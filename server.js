const express = require('express');
const bodyParser = require('body-parser');
const Shopify = require('shopify-api-node');
require('dotenv').config(); // Add this line to load environment variables

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_SECRET,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

app.post('/update-metaobject', async (req, res) => {
  const { selectedDate } = req.body;
  const orderId = '1027'; // Replace with actual order ID

  try {
    await shopify.order.update(orderId, {
      metafields: [
        {
          namespace: 'custom',
          key: 'reorder_date',
          value: selectedDate,
          value_type: 'string'
        }
      ]
    });
    res.status(200).send('Metaobject updated successfully');
  } catch (error) {
    res.status(500).send('Error updating metaobject');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});