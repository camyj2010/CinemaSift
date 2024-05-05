
import './Movie.css';
import React, { useState, useEffect } from 'react';
import logoHome from '../assets/logo.png';
import { MoviePage } from '../routes/service';
import { FaStar } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';


import { useLocation, useParams } from 'react-router-dom';


function Movie() {
    const location = useLocation();
    const {  image } = location.state;
    const {title }= useParams();
    // Estado para almacenar los datos de las tarjetas
    const [ratingT, setratingT] = useState([]);
    const [ratingL, setratingL] = useState([]);
    const [ratingI, setratingI] = useState([]);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // Aquí defines la variable override
    const override = css`
        display: block;
        margin: 0 auto;
    `;


    // Simula una llamada a la API para obtener los datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener los datos del backend
                console.log("hola empece")
                const ratings = await MoviePage(title);
                // Verificar si movies es un array
                if (Array.isArray(ratings)) {
                    // Asignar los datos al estado
                    const description = ratings[0][0];
                    const ratingT = ratings[0][1];
                    const ratingL= ratings[1];
                    const ratingI= ratings[2];
                    console.log(description)
                    setDescription(description);
                    setratingT(ratingT);
                    setratingL(ratingL);
                    setratingI(ratingI);
                    setIsLoading(false);

                } else {
                    console.error('Los datos recibidos no son un array:', ratings);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData(); // Llamar a la función para obtener los datos
    }, []);
    
     // Si location.state es nulo, asigna un objeto vacío

    // Verificar si title y image están definidos antes de usarlos
    return (
        <main className='main'>
            <div className='content'>
                <header className='header'>
                    <img src={logoHome} alt="logo" />
                </header>
                <div>
                    <input type='text' placeholder='Search movies...' className='input' />
                    <button className='buttonSearch'>Search</button>
                </div>
                <div>
                    <button className='button'>Comedy</button>
                    <button className='button'>Drama</button>
                    <button className='button'>Action</button>
                    <button className='button'>Romance</button>
                    <button className='button'>Horror</button>
                    <button className='button'>Mystery</button>
                    <button className='button'>Sci-fi</button>
                    <button className='button'>Animation</button>
                    <button className='button'>Fantasy</button>
                </div>
                <div className='movie-details-container'>
                    <div className='movie-details'>
                        {image && <img src={image} alt={title} />}
                        {title && <h1>{title}</h1>}
                        
                        {/* Otros detalles de la película */}
                    </div>
                <div className='additional-content'>
                    {isLoading ? (
                            <div className="loader-container">
                                <BeatLoader color={"#fff"} loading={isLoading} css={override} size={40} />
                            </div>
                        ) : (
                            <>
                    <p> <b> Roten Tomatoes: </b> {ratingT}/100%  <GiTomato className='icon' /></p>
                    <p><b>IMDb: </b>{ratingI} <FaStar className='start'/></p>
                    <p> <b>letterboxd:  </b>{ratingL}/5.0  <FaStar className='start-green'/></p>
                    <p>{description}</p>
                    </>
                    )}
                </div>
                </div>
            </div>
        </main>
    );
}
export default Movie;