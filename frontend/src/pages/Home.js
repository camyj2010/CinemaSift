import './Home.css';
import React, { useState, useEffect, useRef } from 'react';
import logoHome from '../assets/logo.png';
import { homePageF, movieSearch, genreSearch } from '../routes/service';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';





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
  
    const location = useLocation();
    // console.log=(props.location.state)
    const genre = location.state ? location.state.genre : null;
    const movie = location.state ? location.state.movie : null;
    // Estado para almacenar los datos de las tarjetas
    const [cardsData, setCardsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [scrollX, setScrollX] = useState(0);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const cardContainerRef = useRef(null);
    const override = css`
        display: block;
        margin: 0 auto;
    `;

    // Simula una llamada a la API para obtener los datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (movie) {
                    setShowPrevButton(false);
                    setSearchInput(movie)
                    console.log(movie)
                    await handleSearch(movie);
                }
                else if (genre) {
                    setShowPrevButton(false);
                    console.log("entro a genero")
                    await handleGenreSearch(genre);
                }
                else if (!genre && !movie){
                    console.log("entro a else tambien")
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
                }


            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData(); // Llamar a la función para obtener los datos
        setShowPrevButton(false);
    }, []);

    const handleSearch = async (movie) => {
        try {
            setIsLoading(true);
            const searchResult = await movieSearch(movie); // Invoca la función movieSearch con el valor del input
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
    const handleScroll = (scrollOffset, smoothScroll = true) => {
        const container = cardContainerRef.current;
        if (container) {
            container.scrollTo({
                left: scrollOffset,
                behavior: smoothScroll ? 'smooth' : 'auto',
            });
            setScrollX(scrollOffset);
    
            // Verificar si el usuario ha alcanzado el final de la lista
            setShowPrevButton(scrollOffset > 0); // Mostrar el botón "Prev" si el desplazamiento es mayor que 0
        }
    };
    const handlePrev = () => {
        const container = cardContainerRef.current;
        if (container) {
            const scrollOffset = scrollX - container.offsetWidth;
            setScrollX(scrollOffset);
            handleScroll(scrollOffset, /* smoothScroll */ false);
        }
    };
    
    const handleNext = () => {
        const container = cardContainerRef.current;
        if (container) {
            const scrollOffset = scrollX + container.offsetWidth;
            setScrollX(scrollOffset);
            handleScroll(scrollOffset, /* smoothScroll */ false);
        }
    };

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
                        className='input-action'
                        value={searchInput} // Asigna el valor del estado al input
                        onChange={(e) => setSearchInput(e.target.value)} // Actualiza el estado cuando el input cambia
                    />
                    <button className='button-action' onClick={() => handleSearch(searchInput)}>Search</button>
                </div>
                <div>
                    <button className='button-action' onClick={() => handleGenreSearch("Comedy")}>Comedy</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Drama")}>Drama</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Action")}>Action</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Romance")}>Romance</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Horror")}>Horror</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Mystery")}>Mystery</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Sci-fi")}>Sci-fi</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Animation")}>Animation</button>
                    <button className='button-action' onClick={() => handleGenreSearch("Fantasy")}>Fantasy</button>
                </div>
                {isLoading ? (
                    <div className="loader-container">
                        <BeatLoader color={"#fff"} loading={isLoading} css={override} size={40} />
                    </div>
                ) : (
                    <>
                        <div className='card-container' ref={cardContainerRef}>
                            {cardsData.map((card, index) => (
                                    <Card key={index} title={card.title} image={card.imageSrc} />
                            ))}
                        </div>

                        
                        <button className='button-prev' onClick={handlePrev} style={{ display: showPrevButton ? 'block' : 'none' }}>‹</button>
                        <button className='button-next' onClick={handleNext}>›</button>
                    </>
                )}
            </div>
        </main>
    );
}

export default Home;