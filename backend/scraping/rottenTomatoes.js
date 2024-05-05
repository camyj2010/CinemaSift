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
    await page.goto("https://www.rottentomatoes.com", { timeout: 60000 });

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

    const itemsArray = []
    const page = await browser.newPage();
    await page.goto("https://www.rottentomatoes.com", { timeout: 60000 });
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

    const content = await page.$eval('rt-text[slot="content"]', element => element.textContent);
    // console.log('Contenido del rt-text:', content);
    itemsArray.push(content)
    itemsArray.push(rtTextContent)



    // console.log('rotten Tomatoes', rtTextContent);

    await browser.close();
    return itemsArray;
}

export async function searchName(name) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const itemsArray = []
    const page = await browser.newPage();
    await page.goto("https://www.rottentomatoes.com", { timeout: 60000 });
    await page.type('[data-qa="search-input"]', name);
    await page.keyboard.press('Enter');

    // Esperar a que el primer elemento de la lista esté disponible
    const firstResultSelector = 'search-page-media-row[data-qa="data-row"]:first-child a[data-qa="info-name"]';
    await page.waitForSelector(firstResultSelector);
    // Obtén el título utilizando el selector CSS
    const titleElement = await page.$('search-page-media-row[data-qa="data-row"]:first-child a[data-qa="info-name"]');
    const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);

    const imageSrc = await page.$eval('search-page-media-row[data-qa="data-row"]:first-child a[data-qa="thumbnail-link"] > img', img => img.getAttribute('src'));
    itemsArray.push({ title, imageSrc });


    await browser.close();
    return itemsArray;
}

export async function searchGenre(genre) {
    const browser = await puppeteer.launch({
        headless: true

    });
    let url;

    switch (genre){
        case "Comedy":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:comedy";
            break;  
        case "Drama":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:drama";
            break;
        case "Action":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:action";
            break;
        case "Romance":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:romance";
            break;
        case "Horror":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:horror";
            break;
        case "Mystery":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:mystery_and_thriller";
            break;
        case "Sci-fi":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:sci_fi";
            break;
        case "Animation":
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:animation";
            break;
        case "Fantasy": 
            url = "https://www.rottentomatoes.com/browse/movies_in_theaters/genres:fantasy";
            break;
    }

    const page = await browser.newPage();
    await page.goto(url);

      // Extraer los primeros 10 elementos de la lista
    const elements = await page.$$eval('.flex-container', elements => {
        return elements.slice(0, 6).map(element => {
            const title = element.querySelector('.p--small').textContent.trim();
            const imageSrc = element.querySelector('.posterImage').getAttribute('src');
        return { title, imageSrc };
        });
    });
    // const data = await page.evaluate(() => {
    //     const itemsArray = [];
    //     const carouselItems = document.querySelectorAll('.dynamic-poster-list tiles-carousel-responsive-item-deprecated.visible');

    //     carouselItems.forEach((item, index) => {
    //         if (index < 5) { // Solo queremos los primeros 5 elementos
    //             const title = item.querySelector('a[slot="caption"] .p--small').innerText.trim();
    //             const imageSrc = item.querySelector('rt-img[slot="image"]').getAttribute('src');
    //             itemsArray.push({ title, imageSrc });
    //         }
    //     });

  console.log(elements);

    

    // Cerrar el navegador
    await browser.close();
    return elements;

}


//async function openWebPageGenre() {}