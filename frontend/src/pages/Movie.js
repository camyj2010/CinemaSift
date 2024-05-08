
import './Movie.css';
import React, { useState, useEffect } from 'react';
import logoHome from '../assets/logo.png';
import { MoviePage } from '../routes/service';
import { FaStar } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { Link } from 'react-router-dom';



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
    const [searchInput, setSearchInput] = useState(''); 
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
                const ratings = await MoviePage(title,image);
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
                    <input 
                        type='text' 
                        placeholder='Search movies...' 
                        className='input' 
                        value={searchInput} // Asigna el valor del estado al input
                        onChange={(e) => setSearchInput(e.target.value)} // Actualiza el estado cuando el input cambia
                    />
                    <Link to={ "/"} state= {{genre:null, movie: searchInput }}>
                        <button className='buttonSearch'>Search</button>
                    </Link>
                </div>
                <div>
                    <Link to={ "/"} state= {{ genre:"Comedy", movie: null }}>
                        <button className='button'>Comedy</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Drama", movie: null  }}>
                        <button className='button'>Drama</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Action", movie: null  }}>
                        <button className='button'>Action</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Romance", movie: null  }}>
                    <button className='button'>Romance</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Horror", movie: null  }}>
                    <button className='button'>Horror</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Mystery", movie: null  }}>
                    <button className='button'>Mystery</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Sci-fi", movie: null  }}>
                    <button className='button'>Sci-fi</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Animation", movie: null  }}>
                    <button className='button'>Animation</button>
                    </Link>
                    <Link to={ "/"} state= {{ genre:"Fantasy", movie: null  }}>
                    <button className='button'>Fantasy</button>
                    </Link>
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