import puppeteer from 'puppeteer';

export async function openWebPageL(name) {
    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();
    await page.goto("https://letterboxd.com", { timeout: 90000 }); // 60 segundos de tiempo de espera
    // await new Promise(resolve => setTimeout(resolve, 60000)); 
    
    await page.type('input#search-q', name);
    

    await page.keyboard.press('Enter');
    const firstResultSelector = 'ul.results li:first-child .react-component.poster .image';
    await page.waitForSelector(firstResultSelector, { timeout: 60000 });
    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);
     // Espera a que aparezca el elemento con la clase "average-rating"
     const ratingSelector = '.average-rating';
     const ratingElement = await page.waitForSelector(ratingSelector).catch(() => null);
 
     let rating = null;
     if (ratingElement) {
         // Obtiene el texto dentro del elemento <a> dentro del elemento con la clase "average-rating"
         rating = await page.$eval('.average-rating a', element => element.textContent);
     }
 
     await browser.close();
     return rating;
 }