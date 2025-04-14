export default function Quote({quote}) {
    return <div className="quote-inner">
      <p className="quote">{quote.quote}</p>
      <p className="author"> - {quote.author}</p>
    </div>;
  }