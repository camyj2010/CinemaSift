import puppeteer from 'puppeteer';

export async function openWebPageM() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });

    const page = await browser.newPage();
    await page.goto("https://letterboxd.com", { timeout: 60000 }); // 60 segundos de tiempo de espera

    console.log('Buscando1...');
    
    await page.type('input#search-q', 'The Chronicles of Narnia: The Voyage of the Dawn Treader');
    console.log('Buscando2...');

    await page.keyboard.press('Enter');
    const firstResultSelector = 'ul.results li:first-child .react-component.poster .image';
    await page.waitForSelector(firstResultSelector);
    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);
    // Espera a que aparezca el elemento con la clase "average-rating"
    await page.waitForSelector('.average-rating');

    // Obtiene el texto dentro del elemento <a> dentro del elemento con la clase "average-rating"
    const rating = await page.$eval('.average-rating a', element => element.textContent);

    console.log(rating);


    await browser.close();

}