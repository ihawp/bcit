import { EmptyHeart, FullHeart } from './svg.jsx';

export default function FavouriteButton({buttonStopProp, svgState}) {
    return <button onClick={buttonStopProp}>
        {svgState ? <FullHeart /> : <EmptyHeart /> }
    </button>
}