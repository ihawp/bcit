import Poster from '../components/Poster.jsx';
import Slider from 'react-slick';

import { useState } from 'react';

import "../slick.css";
import "../slick-theme.css";

export default function MovieRow({type, title}) {

    const [slides, setSlides] = useState(4);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slides,
        slidesToScroll: slides,
    };


    
    return <div className="movie-row" key={type}>
        <h2>{title}</h2>
        <Slider {...settings} className="flex flex-row">
            {type ? Object.values(type).map((item, key) => <Poster item={item} key={key} /> ) : null }
        </Slider>
    </div>;
}