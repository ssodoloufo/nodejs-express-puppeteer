import express from 'express';
import htmlToPdf from '../helpers/html-to-pdf.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const pdf = await htmlToPdf('<html><body><h1>Simple title</h1></body></html>');

    res.contentType('application/pdf');
    res.send(pdf);
});

export default router;