import './App.css'
import Calculator from './Calculator.jsx';

export default function App() {
  return <>
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Calculator</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <header>
        <h1>React Calculator!</h1>
      </header>
      <Calculator />
    </main>
    <footer>

    </footer>
  </>
}
