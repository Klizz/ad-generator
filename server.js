const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const puppeteer = require('puppeteer');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/new', (req, res) => {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.seminuevos.com/');
        await page.screenshot({path: 'images/example.png'});
        await browser.close();
      })();
  res.send({ express: 'App working' });
});