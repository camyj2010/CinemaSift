import puppeteer from 'puppeteer';

export async function openWebPageM() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });

    const page = await browser.newPage();
    await page.goto("https://www.metacritic.com", { timeout: 60000 }); // 60 segundos de tiempo de espera

    console.log('Buscando1...')
    //await page.goto("https://www.metacritic.com");
    await page.waitForSelector('.c-searchBoxContainer');
    await page.click('.c-searchBoxContainer');
    console.log('SI');
    // await page.type('div.c-searchBoxContainer input[type="search"]', 'The Chronicles of Narnia: The Voyage of the Dawn Treader');
    console.log('Buscando2...');
    await page.keyboard.press('Enter');

    await browser.close();

}