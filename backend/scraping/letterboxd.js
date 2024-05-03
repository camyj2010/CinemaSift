import puppeteer from 'puppeteer';

export async function openWebPageL(name) {
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();
    await page.goto("https://letterboxd.com"); // 60 segundos de tiempo de espera

    
    
    await page.type('input#search-q', name);
    

    await page.keyboard.press('Enter');
    const firstResultSelector = 'ul.results li:first-child .react-component.poster .image';
    await page.waitForSelector(firstResultSelector);
    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);
    // Espera a que aparezca el elemento con la clase "average-rating"
    await page.waitForSelector('.average-rating');

    // Obtiene el texto dentro del elemento <a> dentro del elemento con la clase "average-rating"
    const rating = await page.$eval('.average-rating a', element => element.textContent);

    // console.log("letterboxd",rating);


    await browser.close();
    return rating;

}