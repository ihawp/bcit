import { useState } from 'react'
import './App.css'

function App() {

  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Camera" },
    { id: 2, name: "Shoes" },
    { id: 3, name: "Handbag" },
    { id: 4, name: "Smartphone" },
    { id: 5, name: "Sweater" },
    { id: 6, name: "Watch" },
    { id: 7, name: "Headphones" },
    { id: 8, name: "Book" },
    { id: 9, name: "Ring" },
  ];

  function Brain(event) {

    event.preventDefault();

    let item = event.target.elements.products.value;

    if (cart.indexOf(item) === -1) {
      setCart([...cart, item]);
    }

  }

  function Cart() {
    return <ul>

      {cart.map(item => <li key={item}>{item}</li>)}

    </ul>;
  }

  function Form() {

    return <form id="product-form" onSubmit={Brain}>

      <label htmlFor="products">Products: </label>
      <select name="products" id="products">

        {products.map((item) => <option key={item.id}>{item.name}</option>)}

      </select>

      <button type="submit">Add Product</button>

    </form>

  }

  function Body() {

    return <header><h1>Shopping Spree</h1></header>

  }

  return <>

    {Body()}

    <p>{cart.length ? 'You have ' + cart.length + ' item(s) in your cart' : 'Add Some Items' }</p>
    
    {Form()}
    
    {Cart()}

  </>;

}

export default App
