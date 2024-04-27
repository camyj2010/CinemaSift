import './Home.css';
import React from 'react';
import logoHome from '../assets/logo.png';

function Home() {
    return (
        <main className='main'>
            <div className='content'>
                <header className='header'>
                    <img src={logoHome}/>
                </header>
                <div>
                    <button className='button'>Search</button>
                </div>
                <div>
                    <button className='button'>Comedy</button>
                    <button className='button'>Drama</button>
                    <button className='button'>Action</button>
                    <button className='button'>Romance</button>
                    <button className='button'>Horror</button>
                    <button className='button'>Mystery</button>
                    <button className='button'>Sci-fi</button>
                </div>
            </div>
        </main>
    );
}

export default Home;
