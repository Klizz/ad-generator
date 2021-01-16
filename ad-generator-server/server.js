const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const puppeteer = require('puppeteer');
require('dotenv').config()
const router = express.Router();
const bodyParser = require("body-parser");
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use("/", router);

app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

router.post('/new', (req, res) => {
  puppeteer.launch().then(async function(browser) {
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
      width: 1280,
      height: 800
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
    await delay(1000);

    /*
    ESCRIBIR TELÉFONO
    await page.waitForXPath("//input[starts-with(@id, 'input_tel')]")
    const tel = await page.$x("//input[starts-with(@id, 'input_tel')]")
    console.log(tel)
    tel[0].type("1234567890")
    */
    
    // PASARLE EL PRECIO DEL USUARIO
    await page.type("#input_precio", req.body.price)
    
    // CONTINUAR A LA SIGUIENTE PÁGINA
    let button = await page.waitForSelector('button[class="next-button"]')
    button.click()
    await delay(5000);
    
    // AGREGAR DESCRIPCION
    await page.waitForSelector('#input_text_area_review');
    await delay(1000);
    await page.type("#input_text_area_review", req.body.description)
    
    // SUBIR FOTO
    const elementHandle = await page.$("input[type=file]");
    await elementHandle.uploadFile('image.jpeg');
    await elementHandle.uploadFile('image2.jpeg');
    await elementHandle.uploadFile('image3.jpeg');
    
    // CONTINUAR
    let button2 = await page.waitForSelector('button[class="next-button"]')
    button2.click()
    await page.waitForSelector('#cancelButton')

    // TERMINAR
    await delay(2000);
    await page.click('#cancelButton')

    // TOMAR SCREENSHOT
    await delay(6000);
    await page.screenshot({ path: 'images/example.png' });
    await browser.close();

    res.sendFile(__dirname + '/images/example.png');
});
});