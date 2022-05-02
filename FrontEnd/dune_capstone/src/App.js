import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './homepage.js';
import ResultPage from './resultpage.js';
import ViewPage  from './viewpage';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomePage/>}/> 
      <Route exact path="/homepage" element={<HomePage/>}/>
      <Route exact path="/resultpage" element={<ResultPage/>}/>
      <Route exact path="/viewpage" element={<ViewPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
