import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';


//Components
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from "./components/EditMovieForm";
import { useHistory } from "react-router-dom";
import AddMovieForm from "./components/AddMovieForm";
import useAxios, {REQ_TYPES} from "./endpoints/useAxios";



const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push }= useHistory();
  const [getMovies,data] = useAxios();
  const [deleteMovies]= useAxios();


  useEffect(() => {
    // axios.get('http://localhost:9000/api/movies')
    //   .then(res => {
    //     setMovies(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    getMovies({
      endpoint:"movies/",
      reqType: REQ_TYPES.GET,
    }).then((res)=>{
      setMovies(data)
    })
  }, [data]);

  const deleteMovie = (id) => {
    //  axios
    //   .delete(`http://localhost:9000/api/movies/${id}`)
    //   .then((res) => {
    //     setMovies(res.data);
    //     push("/movies/")
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    deleteMovies({
      endpoint:`movies/${id}`,
      reqType: REQ_TYPES.DELETE,
    }).then((res)=>{
          setMovies(res);
          push("/movies");
    })
  };



  const addToFavorites = (movie) => {
    console.log("movie",movie);
    console.log("favoriteMovies",favoriteMovies)
    if(!favoriteMovies.find(item => item.id === movie.id)){
      setFavoriteMovies([...favoriteMovies,movie]) 
     
    }
  }



 
  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
        <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route exact path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} />
            </Route>
            {/* props={{deleteMovie,addToFavorites}} */}

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

