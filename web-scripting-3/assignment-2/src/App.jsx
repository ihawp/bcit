import { useState } from 'react'
import quotes from './quotes.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Quote from './Quote.jsx';
import { randomIntWithMax } from './functions.js';
import './App.css'

function App() {

  const [thing, setThing] = useState(-1);

  const changeQuote = () => {
    let q = randomIntWithMax(quotes.length);
    q === thing && quotes[q - 1] ? q-- : q++;
    q === thing && quotes[q + 1] ? q++ : q--;
    setThing(q);
  }

  return <>
    {Header()}
    <div className="quote-outer">{thing === -1 ? 'Click to get a quote!' : Quote(quotes[thing])}</div>
    <button onClick={changeQuote}>{thing > -1 ? 'Get Another Quote' : 'Get Quote'}</button>
    {Footer()}
  </>;
}

export default App
