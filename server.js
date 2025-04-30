const express = require('express');
const bodyParser = require('body-parser');
const Shopify = require('shopify-api-node');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const shopify = new Shopify({
  shopName: 'ekta124.myshopify.com',
  apiKey: '41cf8fae3fff1d37d588dc162829395e',
  password: '5f266b9c2292dff7a34225fec26f04ba',
  accessToken: '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'
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