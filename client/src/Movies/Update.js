import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';

const updateMovie = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}
const Update = props => {
    const{push} = useHistory();
    const [movie, setMovie] = useState(updateMovie);
    const {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(err => console.log(err))
    }, [id]);

    const changeHandler = e => {
        e.persist();
    let value = e.target.name === 'stars' ? e.target.value.split(','): e.target.value
        setMovie({
          ...movie,
          [e.target.name]:value
        });
      };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            props.getMovieList()
            push(`/`);
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore" 
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars.join(',')}
        />
        <div className="baseline" />

       
        <button className="md-button form-button">Update</button>
      </form>
        </div>
    )
}
export default Update 