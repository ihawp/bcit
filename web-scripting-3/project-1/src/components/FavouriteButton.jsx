import { EmptyHeart, FullHeart } from './svg.jsx';

export default function FavouriteButton({buttonStopProp, svgState}) {
    return <button className="favourite" onClick={buttonStopProp}>
        {svgState ? <FullHeart /> : <EmptyHeart /> }
    </button>
}