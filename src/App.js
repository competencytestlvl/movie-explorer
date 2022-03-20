import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';

// Import css
import './App.css';
import MovieCard from "./MovieCard";
import searchIcon from './search.svg'

// External API key - taken from Online Movie Database (OMDB) API: https://www.omdbapi.com/apikey.aspx*/ 
const API_KEY = process.env.REACT_APP_API_KEY;
const API_ENDPOINT = `http://www.omdbapi.com/?apikey=${API_KEY}`;
console.log(API_ENDPOINT);

// Sample movie object
const sampleMovie =
    {
        "Title": "Batman Begins",
        "Year": "2005",
        "imdbID": "tt0372784",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    }

// Create instance of functional compoent for App
const App = () => {
    
    // Set state for movies
    const [movies, setMovies] = useState([]);
    // Set state for movie search with initial value set to empty string.
    const [movieSearch, setmovieSearch] = useState(['']);

    // fetch data from API asynchronously
    const queryMovies = async (title) => {
        // define response
        const response = await fetch(`${API_ENDPOINT}&s=${title}`);
        // return data as json object
        const data = await response.json();
        // print output of data from response's Search array
        console.log(data.Search);
        // Run setter function
        setMovies(data.Search);
    };

    // useEffect hook
    useEffect(()=>{
        // Run helper function
        queryMovies('');
    }, []);

    return (
        <div className="app">
            <Helmet>
                <title>Movie Explorer</title>
            </Helmet>
            <h1>Movie Explorer</h1>

            <div className="search">
                <input 
                    placeholder="Search Movie"
                    value= {movieSearch}
                    onChange={(e) => setmovieSearch(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="searchIcon"
                    onClick={() => queryMovies(movieSearch)}
                />
            </div>

            {
                movies?.length > 0 ? 
                (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                ))}
                </div>)
                :
                (
                <div className="empty">
                    <h2>Please search for a valid movie</h2>
                </div>
                )
            }
        </div>
    );
}


// export components
export default App;