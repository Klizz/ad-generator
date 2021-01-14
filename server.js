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

      // FUNCION DELAY
      function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }

        // INICIALIZAR PUPPETEER
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // INICIAR SESION
        await page.goto('https://www.seminuevos.com/login');
        await page.type('#email_login', email);
        await page.type('#password_login', password);
        await page.waitForSelector('button[type="submit"]', {
          visible: true,
        });
        await page.click('button[type="submit"]');
        await page.waitForSelector('button[type="submit"]', {
          visible: true,
        })
        await page.setViewport({
          width: 1920,
          height: 1080
      })

        await page.waitForSelector('#primaryNav');
        
        // NAVEGAR A PUBLICAR NUEVO ANUNCIO
        await page.goto('https://www.seminuevos.com/wizard?f_dealer_id=-1');
        await page.setViewport({
          width: 1920,
          height: 1080
        })
        
        // SELECCIONAR MARCA
        await page.waitForXPath('//a[@data-activates="dropdown_brands"]')
        await delay(1000);
        let brand = await page.$x('//a[@data-activates="dropdown_brands"]')
        await delay(1000);
        brand[0].click()
        await page.waitForXPath('//li[@data-content="acura"]//a')
        let selectBrand = await page.$x('//li[@data-content="acura"]//a')
        selectBrand[0].click()

        // SELECCIONAR MODELO
        await page.waitForXPath('//a[@data-activates="dropdown_models"]')
        await delay(1000);
        let model = await page.$x('//a[@data-activates="dropdown_models"]')
        await delay(1000);
        model[0].click()
        await page.waitForXPath('//li[@data-content="ilx"]//a')
        let selectModel = await page.$x('//li[@data-content="ilx"]//a')
        selectModel[0].click()

        //SELECCIONAR SUBTIPO
        await page.waitForXPath('//a[@data-activates="dropdown_subtypes"]')
        await delay(1000);
        let subtype = await page.$x('//a[@data-activates="dropdown_subtypes"]')
        await delay(1000);
        subtype[0].click()
        await page.waitForXPath('//li[@data-content="sedan"]//a')
        let selectSubtype = await page.$x('//li[@data-content="sedan"]//a')
        selectSubtype[0].click()

        // SELECCIONAR AÑO
        await page.waitForXPath('//a[@data-activates="dropdown_years"]')
        await delay(1000);
        let year = await page.$x('//a[@data-activates="dropdown_years"]')
        await delay(1000);
        year[0].click()
        await page.waitForXPath('//li[@data-content="2018"]//a')
        let selectYear = await page.$x('//li[@data-content="2018"]//a')
        selectYear[0].click()

        // SELECCIONAR UBICACION
        await page.waitForXPath('//a[@data-activates="dropdown_provinces"]')
        await delay(1000);
        let ubication = await page.$x('//a[@data-activates="dropdown_provinces"]')
        await delay(1000);
        ubication[0].click()
        await page.waitForXPath('//li[@data-content="nuevo leon"]//a')
        let selectUbication = await page.$x('//li[@data-content="nuevo leon"]//a')
        selectUbication[0].click()

        // SELECCIONAR CIUDAD
        await page.waitForXPath('//a[@data-activates="dropdown_cities"]')
        await delay(1000);
        let city = await page.$x('//a[@data-activates="dropdown_cities"]')
        await delay(1000);
        city[0].click()
        await page.waitForXPath('//li[@data-content="monterrey"]//a')
        let selectCity = await page.$x('//li[@data-content="monterrey"]//a')
        selectCity[0].click()

        // SELECCIONAR RECORRIDO
        await page.type("#input_recorrido", "20000")

        // SELECCIONAR PRECIO
        await page.type("#input_precio", "5340000")
        
        // CONTINUAR
        let button = await page.waitForSelector('button[class="next-button"]')
        button.click()
        await delay(5000);
        
        // AGREGAR DESCRIPCION
        await page.waitForSelector('#input_text_area_review');
        await delay(1000);
        await page.type("#input_text_area_review", "Vehiculo en perfecto estado")
        
        // SUBIR FOTO
        const elementHandle = await page.$("input[type=file]");
        await elementHandle.uploadFile('image.jpeg');
        
        // CONTINUAR
        let button2 = await page.waitForSelector('button[class="next-button"]')
        button2.click()
        /*

        // TERMINAR
        */
       await page.waitForSelector('#cancelButton')
       await delay(2000);
       await page.click('#cancelButton')

        // TOMAR SCREENSHOT
        await delay(6000);
        await page.screenshot({path: 'client/public/images/example.png'});
        await browser.close();
        console.log("Done")
      })();
  res.send({ express: 'Publicar un anuncio nuevo' });
});