import express from 'express';
import htmlToPdf from '../services/html-to-pdf.js';

const router = express.Router();

const styleFilePath = './public/templates/test04/style.css';
const scriptFilePath = './public/templates/test04/script.js';
const htmlContentPath = `file:///home/ssodoloufo/workspace/DCS-WORKSPACE/nodejs-express-puppeteer/public/templates/test04/index.html`;

router.get('/', async (req, res) => {

    const pdf = await htmlToPdf(htmlContentPath, styleFilePath, scriptFilePath);

    res.contentType('application/pdf');
    res.send(pdf);
});

export default router;
