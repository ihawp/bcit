import Calculator from './Calculator.jsx';
import { Year } from './year.js';

export default function App() {
  return <>
    <main>
      <header>
        <h1>React Calculator!</h1>
      </header>
      <Calculator />
    </main>
    <footer>
      <p>&copy; ihawp {Year}</p>
    </footer>
  </>
}
