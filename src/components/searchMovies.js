import React, {useState} from 'react';
import MovieCard from './movieCard';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    // const query = "Jurassic Park";

    const url = `https://api.themoviedb.org/3/search/movie?api_key=d37e61442ae63b6487976f502df477b1&language=en-US&query=${query}&page=1&include_adult=false`;
    

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results)
      console.log(data.results);
    }catch(err){
      console.error(err)
    }
  } 

  return (
    <>

     <div>
        <form className='form' onSubmit={searchMovies} >
            <label className='label' htmlFor="query">Movie Name</label>
            <input value={query} onChange={(e) =>  setQuery(e.target.value)}className="input" type='text' name="query" placeholder="i.e. Jurassic Park"/>
            <button className="button" type='submit'>Search</button>
        </form>
    </div>
    <div className="card-list">
      {movies.filter(movie => movie.poster_path).map(movie => (
       <MovieCard movie={movie} key={movie.id}/>
      ))}
    </div>
    </>
   
  )
}

export default SearchMovies