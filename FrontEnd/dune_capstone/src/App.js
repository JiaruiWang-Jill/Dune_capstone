import {BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.css';
import HomePage from './homepage.js';
import ResultPage from './resultpage.js';
import ViewPage  from './viewpage';
import SideBar from './sidebar.js';
function App() {
  return (
    <>
    <BrowserRouter>
    <SideBar className = {styles.sidebar}/>
    <Routes>
      <Route exact path="/" element={<HomePage/>}/> 
      <Route exact path="/homepage" element={<HomePage/>}/>
      <Route exact path="/resultpage" element={<ResultPage/>}/>
      <Route exact path="/viewpage" element={<ViewPage/>}/>
      {/* <Route exact path="/sidebar" element={<SideBar/>}/> */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
