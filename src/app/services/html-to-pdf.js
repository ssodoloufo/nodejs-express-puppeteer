import puppeteer from 'puppeteer';

const defaultOptions = {
  path: './public/download/example.pdf',
  format: 'A4',
  printBackground: true,
  // margin: {
  //   top: '10mm',
  //   right: '10mm',
  //   bottom: '10mm',
  //   left: '10mm',
  // },
};

async function htmlToPdf(htmlFile, styleFile, scriptFile, options = defaultOptions) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto(htmlFile, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // await page.setContent(htmlFile, { 
  //   waitUntil: 'domcontentloaded',
  //   timeout: 60000 
  // });

  await page.setViewport({ width: 1080, height: 1024 });

  // Ajoutez le style pour les sauts de page
  await page.addStyleTag({
    path: styleFile,
  });
  
  // await page.addScriptTag({
  //   path: scriptFile
  // });
  
  const pdfBuffer = await page.pdf(options);

  return pdfBuffer;
}

export default htmlToPdf;