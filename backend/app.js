// app.js
import express from 'express';
import bodyParser from 'body-parser';
import dbconnect from'./config.js';
import movieModel from './movieModel.js';
import { openWebPageT, ImagesHome, searchName, searchGenre} from './scraping/rottenTomatoes.js'; 
import {openWebPageL} from './scraping/letterboxd.js';
import {openWebPageI} from './scraping/imdb.js';
import cors from 'cors';
import cron from 'node-cron';



const app = express();
app.use(bodyParser.json());
app.use(cors());

// Actualización periódica de las películas
cron.schedule('0 20 * * *', async () => {
    try {
        // Realizar scraping y actualizar la información en la base de datos
        const moviesToUpdate = await movieModel.find();
        for (const movie of moviesToUpdate) {
            const title = movie.title;
            const list = [
                await openWebPageT(title),
                await openWebPageL(title),
                await openWebPageI(title)
            ];
            // Actualizar la información de la película en la base de datos
            await movieModel.findOneAndUpdate(
                { title: title },
                { rating: list }
            );
        }
        console.log('Información de películas actualizada con éxito.');
    } catch (error) {
        console.error('Error al actualizar la información de películas:', error);
    }
});


// // Ruta de ejemplo

// app.get('/', async (req, res) => {
//     try {
//         const data = await ImagesHome(); // Llama a la función para obtener la data
//         res.json(data); // Envía la data como respuesta JSON
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error interno del servidor');
//     }
// });
app.get('/', async (req, res) => {
    try {
        // Consultar todas las películas en la base de datos y proyectar solo los campos 'title' y 'imageSrc'
        const movies = await movieModel.find({}, { title: 1, imageSrc: 1, _id: 0 });
        console.log(movies)
        res.json(movies); // Envía la lista de películas como respuesta JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
});
//Funcion de informacion de peliculas

app.post('/:title', async (req, res) => {
    const title = req.params.title;
    const imageSrc =req.body.imageSrc;
    console.log(imageSrc + "holaaa")
    try {
        // Verificar si la película ya existe en la base de datos
        const existingMovie = await movieModel.findOne({ title: title });
        
        // Si la película existe, enviarla como respuesta
        if (existingMovie) {
            console.log(existingMovie.rating);
            res.json(existingMovie.rating);

        } else {
            // Si la película no existe, realizar las búsquedas en la web y enviar los resultados
            const list = [
                await openWebPageT(title),
                await openWebPageL(title),
                await openWebPageI(title)
            ];

            // Guardar la información en la base de datos
            const movie = await movieModel.create({
                title: title,
                imageSrc: imageSrc,
                genre: "", // Supongo que la información de género viene de openWebPageT
                rating: list // Supongo que la información de rating viene de openWebPageL e openWebPageI
            });
            console.log(imageSrc);
        
            console.log(list);
            res.json(list);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// app.get('/:name', async (req, res) => {
//     const name=req.params.name
//     // console.log(name)
    
//     const list = []
//     list.push(await openWebPageT(name));
//     list.push(await openWebPageL(name));
//     list.push(await openWebPageI(name));
//     console.log(list)
//     res.json(list);


// })

app.get('/search/:name', async (req, res) => {
    const name=req.params.name;
    // console.log(name)
    const response= await searchName(name);

    res.json(response);


})

app.get('/search-genre/:genre', async (req, res) => {
    const genre=req.params.genre;
    // console.log(name)
    const response= await searchGenre(genre);

    res.json(response);


})

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
dbconnect();