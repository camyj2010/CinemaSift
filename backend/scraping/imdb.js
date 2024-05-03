import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// Agregar el complemento Stealth
puppeteer.use(StealthPlugin());


export async function openWebPageI(name) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto("https://www.imdb.com"); // 60 segundos de tiempo de espera
    await page.waitForSelector('.imdb-header-search__input');
    await page.type('.imdb-header-search__input', name);
    await page.keyboard.press('Enter');
    // Esperar a que el primer elemento de la lista esté disponible
    const firstResultSelector = '.ipc-metadata-list-summary-item:first-child .ipc-metadata-list-summary-item__t';
    await page.waitForSelector(firstResultSelector);

    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);
    // Esperar a que aparezca el elemento con el atributo "data-testid" igual a "hero-rating-bar__aggregate-rating__score"
    await page.waitForSelector('[data-testid="hero-rating-bar__aggregate-rating__score"]');

    // Obtener el rating del elemento
    const rating = await page.$eval('[data-testid="hero-rating-bar__aggregate-rating__score"]', element => element.textContent.trim());

    // console.log("Imdb ", rating);

    await browser.close();
    return rating;
}