const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const puppeteer = require('puppeteer');
require('dotenv').config()

app.listen(port, () => console.log(`Listening on port ${port}`));

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

app.get('/new', (req, res) => {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.seminuevos.com/login');

        await page.type('#email_login', email);
        await page.type('#password_login', password);

        await page.waitForSelector('button[type="submit"]', {
          visible: true,
        });

        await page.click('button[type="submit"]');

        await page.screenshot({path: 'client/public/images/example.png'});
      })();
  res.send({ express: 'App working' });
});