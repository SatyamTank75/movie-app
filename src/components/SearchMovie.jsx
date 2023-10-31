import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import MovieCard from "./MovieCard.jsx";

function SearchMovie(props) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=9004029c5fa96f5744da523a077db8f3&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <>
      <form className="form container" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movie"
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
}

export default SearchMovie;
