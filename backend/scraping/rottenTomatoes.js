import puppeteer from 'puppeteer';


async function getTextContentOrDefault(page, selector, defaultValue = null, timeout = 30000) {
    let element;
    try {
        element = await Promise.race([
            page.$(selector),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
        ]);
    } catch (error) {
        console.error('Error:', error);
        return defaultValue;
    }

    if (element) {
        const textContent = await page.evaluate(el => el.textContent.trim(), element);
        return textContent;
    } else {
        return defaultValue;
    }
}
export async function openWebPageT() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 200,
    });

    const page = await browser.newPage();
    await page.goto("https://www.rottentomatoes.com");
    await page.type('[data-qa="search-input"]', 'The Chronicles of Narnia: The Voyage of the Dawn Treader');
    await page.keyboard.press('Enter');

    // Esperar a que el primer elemento de la lista esté disponible
    const firstResultSelector = 'search-page-media-row[data-qa="data-row"]:first-child a[data-qa="info-name"]';
    await page.waitForSelector(firstResultSelector);

    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);

    // Wait for the audience score element
    const audienceScoreSelector = 'rt-button[slot="audienceScore"] rt-text';
    const rtTextContent = await getTextContentOrDefault(page, audienceScoreSelector, null, 30000);

    
    console.log('Contenido de rt-text:', rtTextContent);
 
     await browser.close();
 }

//async function openWebPageGenre() {}