import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import axios from 'axios';
import Signup from './pages/Signup/Signup';
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import CreatePost from './pages/CreatePost/CreatePost';
import Profile from './pages/Profile/Profile';

axios.defaults.baseURL = "http://localhost:4000/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  
<Provider store={store}>
<BrowserRouter>

<Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/submit' element={<CreatePost />}></Route>
    <Route path='/user/:username' element={<Profile/>}></Route>
  </Routes>
</BrowserRouter>
</Provider>


  

   
    
);


