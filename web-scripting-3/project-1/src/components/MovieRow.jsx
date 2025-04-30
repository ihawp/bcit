import Poster from '../components/Poster.jsx';
import Slider from 'react-slick';

import { useState } from 'react';

import "../slick.css";
import "../slick-theme.css";

export default function MovieRow({type, title}) {

    const [slides, setSlides] = useState(4);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slides,
        slidesToScroll: slides,
        direction: 'right',
      };
    return <div className="movie-row">
        <h2>{title}</h2>
        <Slider {...settings} className="flex flex-row">
            {type ? Object.values(type).map((item, key) => <Poster item={item} key={key} /> ) : ''}
        </Slider>
    </div>;
}