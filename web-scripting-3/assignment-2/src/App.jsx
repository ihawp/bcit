import { useState } from 'react';
import quotes from './quotes.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Quote from './Quote.jsx';
import { randomIntWithMax } from './functions.js';
import './App.css';

function App() {

  const [current, setCurrent] = useState(-1);

  const changeQuote = () => {
    let q = randomIntWithMax(quotes.length);
    q === current && quotes[q - 1] ? q-- : q++;
    q === current && quotes[q + 1] ? q++ : q--;
    setCurrent(q);
  }

  return <>
    {Header()}
    <div className="quote-outer">{current === -1 ? 'Click to get a quote!' : Quote(quotes[current])}</div>
    <button onClick={changeQuote}>{current > -1 ? 'Get Another Quote' : 'Get Quote'}</button>
    {Footer()}
  </>;
}

export default App
