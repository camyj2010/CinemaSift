import './Home.css';
import React, { useState, useEffect } from 'react';
import logoHome from '../assets/logo.png';
import { homePageF } from '../routes/service';


// Componente de tarjeta
function Card({ title, image }) {
    return (
        <div className='card'>
            <img src={image} alt={title} />
            <h3>{title}</h3>
        </div>
    );
}



function Home() {

    // Estado para almacenar los datos de las tarjetas
    const [cardsData, setCardsData] = useState([]);

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
                } else {
                    console.error('Los datos recibidos no son un array:', movies);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData(); // Llamar a la función para obtener los datos
    }, []);


    return (
        <main className='main'>
            <div className='content'>
                <header className='header'>
                    <img src={logoHome} />
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
                <div className='card-container'>
                    {cardsData.map((card, index) => (
                        <Card key={index} title={card.title} image={card.imageSrc} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Home;