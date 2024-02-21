import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import  Navbar from './Navbar'
import { client }  from './Url'
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Explore from './Explore';

export const UserContext = createContext();

function App() {

  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      console.log(res.data)
      setCurrentUser(true);
    })
    .catch(function(error) {
      console.log(error.response.data)
      setCurrentUser(false);
    });
  }, []);


  return (
    <div className='w-full h-full bg-black-2'>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path='/signup' element={<Registration/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/explore' element={<Explore/>}/>
          </Route>
        </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
