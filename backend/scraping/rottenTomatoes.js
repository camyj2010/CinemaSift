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

export async function ImagesHome() {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto("https://www.rottentomatoes.com");

    // Esperar a que los elementos deseados estén disponibles en el DOM
    await page.waitForSelector('.dynamic-poster-list');
    console.log("1");
    
    const data = await page.evaluate(() => {
        const itemsArray = [];
        const carouselItems = document.querySelectorAll('.dynamic-poster-list tiles-carousel-responsive-item-deprecated.visible');
        
        carouselItems.forEach((item, index) => {
            if (index < 5) { // Solo queremos los primeros 5 elementos
                const title = item.querySelector('a[slot="caption"] .p--small').innerText.trim();
                const imageSrc = item.querySelector('rt-img[slot="image"]').getAttribute('src');
                itemsArray.push({ title, imageSrc });
            }
        });

        return itemsArray;
    });

    // Imprimir los títulos y enlaces de las imágenes extraídos
    console.log('Títulos y enlaces de las primeras 5 imágenes del carousel:');
    console.log(data);

    // Cerrar el navegador
    await browser.close();
    return data;
}


export async function openWebPageT(name) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto("https://www.rottentomatoes.com");
    await page.type('[data-qa="search-input"]', name);
    await page.keyboard.press('Enter');

    // Esperar a que el primer elemento de la lista esté disponible
    const firstResultSelector = 'search-page-media-row[data-qa="data-row"]:first-child a[data-qa="info-name"]';
    await page.waitForSelector(firstResultSelector);

    // Hacer clic en el primer elemento de la lista
    await page.click(firstResultSelector);

    // Wait for the audience score element
    const audienceScoreSelector = 'rt-button[slot="audienceScore"] rt-text';
    await page.waitForSelector(audienceScoreSelector);
    const rtTextContent = await getTextContentOrDefault(page, audienceScoreSelector, null, 30000);


    // console.log('rotten Tomatoes', rtTextContent);

    await browser.close();
    return rtTextContent;
}

//async function openWebPageGenre() {}