
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Services from './Components/Services';
import Appliance from './Components/Appliances';
import Footer from "./Components/Footer"


import VideoCarousel from "./Components/VideoCarousel"
import BecomeSP from "./Pages/BecameSP"
import Home from "./Pages/Home"
import Beauty from './Components/Beauty';
import BecomeServiceProviderForm from './Pages/BecameSP';
import HouseCleaning from './Components/HouseCleaning';
import Orders from './Pages/Orders';


function App() {
  return (

    <Router>
      <Navigation /> 
      <Routes>

        <Route path="/" element={<Home/>} /> 
        <Route path="/appliance" element={<Appliance />} /> 
        <Route path="/beauty" element={<Beauty/>} /> 
        <Route path="/housecleaning" element={<HouseCleaning/>} /> 
        <Route path="/services" element={<Services/>} /> 
        <Route path="/orders" element={<Orders/>} /> 
        <Route path="/becomeSP" element={<BecomeServiceProviderForm/>} /> 
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
