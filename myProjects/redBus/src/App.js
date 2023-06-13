import './App.css';
import React from 'react';
import Home from "./components/Home/Home";
import Selectseat from "./components/Selectseat/Selectseat";
import BookTicket from './components/BookTicket/BookTicket';
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/Footer";
import ApiContext from './components/context/ApiContext';
function App() {
  return (
    <ApiContext>
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/seatmenu' element={<Selectseat />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/payment' element={<BookTicket />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </ApiContext>
  );
}

export default App;
