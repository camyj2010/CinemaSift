import './Home.css';
import React, { useState, useEffect } from 'react';
import logoHome from '../assets/logo.png';
import { homePageF, movieSearch, genreSearch} from '../routes/service';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';





// Componente de tarjeta
function Card({ title, image }) {
    return (
        <Link to={title
        }
            state={{ image }}>
            <div className='card'>
                <img src={image} alt={title} />
                <h3>{title}</h3>
            </div>
        </Link>
    );
}





function Home() {

    // Estado para almacenar los datos de las tarjetas
    const [cardsData, setCardsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(''); 
    const override = css`
        display: block;
        margin: 0 auto;
    `;


    // Simula una llamada a la API para obtener los datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener los datos del backend
                const movies = await homePageF();
                // Verificar si movies es un array
                if (Array.isArray(movies)) {
                    // Asignar los datos al estado
                    setCardsData(movies);
                    setIsLoading(false);
                } else {
                    console.error('Los datos recibidos no son un array:', movies);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData(); // Llamar a la función para obtener los datos
    }, []);

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const searchResult = await movieSearch(searchInput); // Invoca la función movieSearch con el valor del input
            setCardsData(searchResult);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error.message);
            setIsLoading(false);
        }
    };

    const handleGenreSearch = async (genre) => {
        try {
            setIsLoading(true);
            const searchResult = await genreSearch(genre); // Invoca la función genreSearch con el valor del input
            console.log(searchResult);
            setCardsData(searchResult);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error.message);
            setIsLoading(false);
        }
    }

    return (
        <main className='main'>
            <div className='content'>
                <header className='header'>
                    <img src={logoHome} />
                </header>
                <div>
                    <input 
                        type='text' 
                        placeholder='Search movies...' 
                        className='input' 
                        value={searchInput} // Asigna el valor del estado al input
                        onChange={(e) => setSearchInput(e.target.value)} // Actualiza el estado cuando el input cambia
                    />
                    <button className='buttonSearch' onClick={handleSearch}>Search</button> {/* Invoca la función handleSearch al hacer clic */}
                </div>
                <div>
                    <button className='button' onClick={() => handleGenreSearch("Comedy")}>Comedy</button>
                    <button className='button' onClick={() =>handleGenreSearch("Drama")}>Drama</button>
                    <button className='button' onClick={() =>handleGenreSearch("Action")}>Action</button>
                    <button className='button' onClick={() =>handleGenreSearch("Romance")}>Romance</button>
                    <button className='button' onClick={() =>handleGenreSearch("Horror")}>Horror</button>
                    <button className='button' onClick={() =>handleGenreSearch("Mystery")}>Mystery</button>
                    <button className='button' onClick={() =>handleGenreSearch("Sci-fi")}>Sci-fi</button>
                    <button className='button' onClick={() =>handleGenreSearch("Animation")}>Animation</button>
                    <button className='button' onClick={() =>handleGenreSearch("Fantasy")}>Fantasy</button>
                </div>
                {isLoading ? (
                    <div className="loader-container">
                        <BeatLoader color={"#fff"} loading={isLoading} css={override} size={40} />
                    </div>
                ) : (
                    <>
                        <div className='card-container'>
                            {cardsData.map((card, index) => (
                                <Card key={index} title={card.title} image={card.imageSrc} />
                            ))}

                        </div>
                    </>
                )}
            </div>
        </main>
    );
}

export default Home;