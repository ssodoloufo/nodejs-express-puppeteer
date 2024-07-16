const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.get('/pdf', async (req, res) => {
  try {
    const url = req.query.target;

    const browser = await puppeteer.launch({
      //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Spécifiez le chemin correct
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://laravel.com', { waitUntil: 'networkidle2', timeout: 60000 });

    await page.setViewport({ width: 1080, height: 1024 });


    // Ajoutez le style pour les sauts de page
    await page.addStyleTag({
      content: '.book-page { page-break-after: always; width: 210mm; height: 297mm; box-sizing: border-box; aspect-ratio: 620 / 877; }'
    });


    const pdf = await page.pdf({
      path: './download/example.pdf',
      format: 'A4',
      printBackground: true // Optionnel, pour inclure les arrière-plans dans le PDF
    });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);

  }
  catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }

});

app.listen(3000, () => console.log('Server is running on port 3000'));
