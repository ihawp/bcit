import Poster from '../components/Poster.jsx';
import Slider from 'react-slick';

import "../styles/slick.css";
import "../styles/slick-theme.css";

export default function MovieRow({type, title}) {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1460,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 867,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 458,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
    };
    
    return <section className="movie-row" key={type}>
        <h2>{title}</h2>
        <Slider {...settings} className="flex flex-row">
            {Object.values(type).map((item, key) => <Poster item={item} key={key} /> ) }
        </Slider>
    </section>;
}