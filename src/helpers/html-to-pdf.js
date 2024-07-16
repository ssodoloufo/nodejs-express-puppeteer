import puppeteer from 'puppeteer';

const defaultOptions = {
    // url: 'https://www.eraser.io/',
    path: './download/example.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm',
    },
};

async function htmlToPdf(html, options = defaultOptions){
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const pdfBuffer = await page.pdf(options);

    return pdfBuffer;
}

export default htmlToPdf;