const express = require('express');
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const testRouter = require('./routes/test');
const functions = require("firebase-functions");
require('dotenv')
require("dotenv").config()

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
// const dotenv = require('dotenv');
// dotenv.config({
//     path: '.localenv'
// });
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Swagger Demo API',
            version: '1.0.0',
            description: 'A simple Express API with Swagger documentation',
        },
    },
    apis: ['app.js', 'routes/test.js'],
};

// api documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Use the test router
app.use('/stest', testRouter);
app.use('/user', require('./routes/user'));
app.use('/transaction', require('./routes/transaction'));
app.use('/wallet', require('./routes/wallet'));
app.use('/detect', require('./routes/detect'));
app.get('/', (req, res) => {
    res.json("API server is running fine");
});

const storeItems = new Map([
    // [1, { priceInCents: 100, name: 'Top up $1'}],
])

// check if store has specific 'id' -> 'amount', if not add-in
const addNewAmountIntoStore = async (req) => {
    const value = req.body.items[0].id
    if (storeItems.size >= 0 && !storeItems.has(value) ) {
        storeItems.set(value, { priceInCents: value*100, name:`Top Up $${value}`});
    }
}
// app.post('/checkout', async (req, res) => {
//     console.log(req.body)
//     const items = req.body.items;
//     let lineItems = [];
//     items.foreach((item) => {
//         lineItems.push({
//             price: item.id,
//             quantity: item.quantity
//         })
//     });

app.post('/checkout-session', async (req, res) => {
    
    await addNewAmountIntoStore(req);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: "http://localhost:3001/TopUp?status=successful",
        line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id)
            return {
                price_data: {
                    currency: 'sgd',
                    product_data: {
                        name: storeItem.name
                    },
                    unit_amount: storeItem.priceInCents
                },
                quantity: item.quantity
            }
        })
    })
    res.json({ url: session.url })
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// if (process.env.local === 'true') {
//     app.listen(port, () => {
//         console.log(`Server started on http://localhost:${port}`);
//     });
// } else {
//     exports.api = functions.https.onRequest(app);
// }
