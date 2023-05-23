import React,{useState, useEffect } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './home.css'
import MovieList from '../../components/MovieList/MovieList';

const Home = () => {
    const [data,setData] = useState([]);
    useEffect(()=>{
     const fetchdata =async () =>{
        try{
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US");
            setData(response.data.results);
          }catch(err){
            console.log(err);
          }
     }
     fetchdata();
    },[])
  return (
        <>
          <div className="poster">
            <Carousel
              showThumbs={false}
              autoPlay={true}
              infiniteLoop={true}
              transitionTime = {3}
              showStatus={false}
              
            >
                {
                data.map(movie=>(
                    <Link key={movie.id} style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                    <div className="posterImage">
                        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                    </div>
                    <div className="posterImage_overlay">
                        <div className="posterImage__title">{movie ? movie.title:""}</div>
                        <div className="posterImage__runtime">
                            {movie ? movie.release_date:""}
                            <span className="posterImage__rating">{movie ? movie.vote_average:""}</span>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <div className="posterImage__description">{movie ? movie.overview:""}</div>
                </Link>
                ))
              }
            </Carousel>
            <MovieList/>
          </div>
        </>
  )
}

export default Home