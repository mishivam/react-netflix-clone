import React, { useState, useEffect } from "react";
import axios from "../js/axios"; //default import is instance but we can give any name to DEFAULT export when importing..
import "../css/RowComponent.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const imgBase_url = "https://image.tmdb.org/t/p/original/";

function RowComponent({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [lastMovie, setLastMovie] = useState("");

  //useEffect(function, dependencies)
  //after react updates its dom them this useEffect runs.
  //if dep = [any-variable] then useEffect will run every time the variable gets changed.
  //if dep = [] = run once when component loads and dont run again.
  // if in useEffect we are using any props variabel like in following useEfect we are useing fetchUrl..then
  //we have to add that variable into [dependencies].
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    //if trailer is playing or poster is already clicked
    if (trailerUrl && (movie?.name || movie?.title) === lastMovie) {
      setTrailerUrl("");
    } else {
      // https://www.youtube.com/watch?v=XtMThy8QKqU&t=3671s
      //we want to get 'v' in the above youtube link
      //movieTrailer(movie?.name || "") -> movieTrailer will search
      // for the trailer of the provided movie name
      // "" means if no movie name is present then dont search
      //then() => after we get video trailer
      // URL(url).search => after getting url it will return  a string of parameters,
      // starts with the question mark ? in the given link
      //URLSearchParams => it allows to perform some action on url like get, set, sort etc..
      //.get('v'):- it will search for 'v' in the video url.
      //for better understanding go to :- https://javascript.info/url
      
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          console.log(url);
          const videoUrl = new URLSearchParams(new URL(url).search);
          setTrailerUrl(videoUrl.get("v"));
        })
        .catch((e) => console.log(e));
      setLastMovie(movie?.name || movie?.title);
    }
  };
  return (
    <div className="Row">
      <h3>{title}</h3>
      <div className="Row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`Row__poster ${isLargeRow && "Row__largePoster"}`}
            src={`${imgBase_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default RowComponent;
