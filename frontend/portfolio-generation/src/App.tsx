import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/projects/Projects.page';
import PortofolioPage from './pages/portofolio/portofolio.page';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar/navbar.component';
import axios from 'axios';
import { configure } from 'axios-hooks';


function App() {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
  })
  configure({ axios: axiosInstance })
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<ProjectsPage />} />
          <Route path="/generatePortfolio" element={<PortofolioPage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
