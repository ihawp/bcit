import Poster from '../components/Poster.jsx';

export default function Results({data}) {
  return <section className="flex flex-column justify-center">
    <div className="results-inner flex flex-row flex-wrap gap-1 items-center">
      {data.length > 0 ? (
          data.map((item) => <Poster item={item} key={item.id} />)
        ) : (
          <p>No results yet.</p>
      )}
    </div>
  </section>;
}
