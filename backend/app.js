// app.js
import express from 'express';
import { openWebPageT, ImagesHome } from './scraping/rottenTomatoes.js'; 
import {openWebPageL} from './scraping/letterboxd.js';
import {openWebPageI} from './scraping/imdb.js';
import cors from 'cors';

const app = express();
app.use(cors());
// Ruta de ejemplo

app.get('/', async (req, res) => {
    try {
        const data = await ImagesHome(); // Llama a la función para obtener la data
        res.json(data); // Envía la data como respuesta JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});
app.get('/:name', async (req, res) => {
    const name=req.params.name
    console.log(name)
    
    const list = []
    list.push(await openWebPageT(name));
    list.push(await openWebPageL(name));
    list.push(await openWebPageI(name));
    console.log(list)
    res.json(list);


})


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});