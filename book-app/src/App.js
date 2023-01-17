import logo from './books.gif';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import { BookList } from './booklist';

import {HashRouter as Router} from 'react-router-dom';
import {Link,Routes,Route} from 'react-router-dom';
import { CalculatorContainer } from './calculator';
import { BookDetail, DetailContainer } from './bookdetail';
import { HTTP } from './ajaxhelpers';
import { useEffect, useState } from 'react';
import { ReduxDemo, ReduxFunc } from './reduxdemo';
import { Provider } from 'react-redux';
import { bookStore } from './bookstore';


export const translations={
  title:'SomeApp',
  locale:'en',
  buttons:{},
  book:{}
}


function App() {
  const [locale,changeLocale]=useState('');

  useEffect(() => {
    changeLang();
  })

  function changeLang(loc=null){
    if (!loc) loc=localStorage['locale'] || 'en';
    console.log("Muutetaan kieli",loc)
    localStorage['locale']=loc;
    HTTP.get('/translations/translations_'+loc+'.json').then(trans => {
      console.log("Käännökset",trans)
      Object.assign(translations,trans);
      translations.locale=loc;
      changeLocale(loc);
    });
  }

  return (
    <Provider store={bookStore}>
    <Router><div className="container">
      <header>
        <img src={logo} />
        <h1>{translations.title}</h1>
      </header>
      <nav>
        <Link to="/">Kirjat</Link>
        <Link to="/calc">Laskin</Link>
        <input onClick={() => changeLang('fi')} type="button" value="FI" style={{float:'right'}} />
        <input onClick={() => changeLang('en')} type="button" value="EN" style={{float:'right'}} />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/calc" element={<CalculatorContainer />} />
          <Route path="/book/:id/*" element={<DetailContainer />} />
        </Routes>
        <ReduxDemo />
        <ReduxFunc />
       </main>
      <footer>
        Copyright Acme Consulting
      </footer>
    </div></Router></Provider>
  );
}

export default App;
