import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
        getMovieList()
        history.push(`/`);
    })
    .catch(err => console.log(err))
}
  
  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
 const handleEdit = () => {
history.push(`/update-movie/${movie.id}`)

 }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
     <button onClick={handleEdit}>Update</button>
    </div>
  );
}

export default Movie;
//<button className="md-button form-button">Update</button>