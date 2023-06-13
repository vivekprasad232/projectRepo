import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Variables from './components/Context/Variable';
import HistoryPage from './components/HistoryPage/HistoryPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [isHistory,setIsHistory]=useState(false);
  return (
    <Variables.Provider value={
      {
        isHistory:isHistory,
        setIsHistory:setIsHistory
      }
    }>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/history' element={<HistoryPage />}/>
      </Routes>
    </BrowserRouter>
    </Variables.Provider>
  );
}

export default App;
