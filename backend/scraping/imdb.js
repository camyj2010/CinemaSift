import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Agregar el complemento Stealth
puppeteer.use(StealthPlugin());


export async function openWebPageI(name) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto("https://www.imdb.com", { timeout: 60000 }); // 60 segundos de tiempo de espera
    // await new Promise(resolve => setTimeout(resolve, 60000)); 
    await page.waitForSelector('.imdb-header-search__input');
    await page.type('.imdb-header-search__input', name);
    await page.keyboard.press('Enter');
    // Esperar a que el primer elemento de la lista esté disponible
    const firstResultSelector = '.ipc-metadata-list-summary-item:first-child .ipc-metadata-list-summary-item__t';
    await page.waitForSelector(firstResultSelector, { timeout: 60000 });

    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);
       // Esperar a que aparezca el elemento con el atributo "data-testid" igual a "hero-rating-bar__aggregate-rating__score"
    const ratingSelector = '[data-testid="hero-rating-bar__aggregate-rating__score"]';
    const ratingElement = await page.waitForSelector(ratingSelector).catch(() => null);
   
    let rating = null;
    if (ratingElement) {
           // Obtener el rating del elemento
           rating = await page.$eval(ratingSelector, element => element.textContent.trim());
       }
   
    await browser.close();
    return rating;
   }