// app.js
import express from 'express';
import { openWebPageT } from './scraping/rottenTomatoes.js'; 
import {openWebPageL} from './scraping/letterboxd.js';
import {openWebPageI} from './scraping/imdb.js';

const app = express();

// Ruta de ejemplo

app.get('/', async (req, res) => {
    try {
       
        res.send('¡Hola mundo desde Express!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});
app.get('/:name', async (req, res) => {
    const name=req.params.name
    console.log(name)
    
    await openWebPageT(name);
    await openWebPageL(name);
    await openWebPageI(name);


})


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});