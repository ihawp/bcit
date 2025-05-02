import Poster from '../components/Poster.jsx';
import Slider from 'react-slick';

import "../styles/slick.css";
import "../styles/slick-theme.css";

export default function MovieRow({type, title}) {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 860,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
    };
    
    return <div className="movie-row" key={type}>
        <h2>{title}</h2>
        <Slider {...settings} className="flex flex-row">
            {type ? Object.values(type).map((item, key) => <Poster item={item} key={key} /> ) : null }
        </Slider>
    </div>;
}