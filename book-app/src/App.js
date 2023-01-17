import logo from './books.gif';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import { BookList } from './booklist';

import {HashRouter as Router} from 'react-router-dom';
import {Link,Routes,Route} from 'react-router-dom';
import { CalculatorContainer } from './calculator';
import { BookDetail } from './bookdetail';


function App() {
  return (
    <Router><div className="container">
      <header>
        <img src={logo} />
        <h1>Kirjasovellus</h1>
      </header>
      <nav>
        <Link to="/">Kirjat</Link>
        <Link to="/calc">Laskin</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/calc" element={<CalculatorContainer />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
       </main>
      <footer>
        Copyright Acme Consulting
      </footer>
    </div></Router>
  );
}

export default App;
