
import './App.css';
import Header from './components/Common/Header';
import LandingPageComponent from './components/LandingPage/Intro';
import Footer from './components/Common/Footer';
import Home from './pages/home';
import DashboardPage from './pages/dashboard';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import CoinPage from './pages/coin';
import ComparePage from './pages/compare';
import Watchlist from './pages/watchlist';
import { useEffect } from 'react';

function App() {
  var cursor;
  var cursorPointer;

  useEffect(() => {
    cursor = document.getElementById("cursor");
    cursorPointer = document.getElementById("cursor-pointer");

    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursor.style.left = e.clientX + "px"),
        (cursor.style.top = e.clientY + "px"),
        (cursorPointer.style.left = e.clientX + "px"),
        (cursorPointer.style.top = e.clientY + "px")
      );
    });

    document.body.addEventListener("mousedown", function (e) {
      return (
        (cursor.style.height = "0.5rem"),
        (cursor.style.width = "0.5rem"),
        (cursorPointer.style.height = "3rem"),
        (cursorPointer.style.width = "3rem")
      );
    });

    document.body.addEventListener("mouseup", function (e) {
      return (
        (cursor.style.height = "0.3rem"),
        (cursor.style.width = "0.3rem"),
        (cursorPointer.style.height = "2rem"),
        (cursorPointer.style.width = "2rem")
      );
    });
  }, []);
  return (
    <div className="App">
      <div className="cursor" id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/coin/:id' element={<CoinPage/>}/>
        <Route path="/compare" element={<ComparePage/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
