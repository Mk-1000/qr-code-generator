const express = require('express');
const QRCode = require('qrcode');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'QR Code Generator API',
            version: '1.0.0',
            description: 'Generate QR codes in PNG or JPG format',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local server'
            }
        ],
    },
    apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /generate:
 *   get:
 *     summary: Generate a QR code
 *     description: Generate a QR code for a given URL in either PNG or JPG format.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The URL to encode in the QR code
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [png, jpg]
 *         required: true
 *         description: The format of the QR code (png or jpg)
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: URL is required
 *       500:
 *         description: Error generating QR code
 */
app.get('/generate', async (req, res) => {
    const { url, format } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const options = {
            color: {
                dark: '#000000', // Black QR code
                light: format === 'png' ? '#00000000' : '#FFFFFF' // Transparent for PNG, white for JPG
            }
        };

        const qrCode = await QRCode.toBuffer(url, options);

        if (format === 'jpg') {
            res.setHeader('Content-Type', 'image/jpeg');
        } else {
            res.setHeader('Content-Type', 'image/png');
        }
        
        res.send(qrCode);
    } catch (err) {
        res.status(500).send('Error generating QR code');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
