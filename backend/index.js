const express = require('express');
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const testRouter = require('./routes/test');
const functions = require("firebase-functions")

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
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the test router
app.use('/test', testRouter);
app.use('/user', require('./routes/user'));
app.get('/', (req, res) => {
    res.json("API server is running fine");
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// exports.api = functions.https.onRequest(app)