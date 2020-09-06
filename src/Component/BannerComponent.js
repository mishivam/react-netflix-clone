import React, { useState, useEffect } from "react";
import axios from "../js/axios"; //defualt name is instane in axios file
import requests from "../js/request";
import "../css/BannerComponent.css"

function BannerComponent() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n){
      return str?.length>n ? str.substr(0,n-1)+"...":str;
  }

  return (
    
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")` ,
        backgroundPosition: "auto auto",
       
      }}
    >
      <div className="Banner__contents">
        <h1 className="Banner__title">{movies?.title || movies?.name || movies?.original_name}</h1>
        <div className="Banner__buttons">
          <button type="submit" className="Banner__button">Play</button>
          <button type="submit" className="Banner__button">My List</button>
        </div>
        <h1 className="Banner__description">
            <p>
               {truncate(movies?.overview, 150)} 
            </p>
        </h1>
      </div>

      <div className="Banner__fadeBottom"></div>
    </header>
  );
}

export default BannerComponent;
