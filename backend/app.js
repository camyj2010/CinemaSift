// app.js
import express from 'express';
import { openWebPageT } from './scraping/rottenTomatoes.js'; 
import {openWebPageM} from './scraping/metacritic.js';

const app = express();

// Ruta de ejemplo

app.get('/', async (req, res) => {
    try {
        //await openWebPageT();
        await openWebPageM();
        res.send('¡Hola mundo desde Express!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});