import React, { createContext } from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import  Navbar from './Navbar'
import { client }  from './Url'
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Explore from './Explore';
import RentACar from './RentACar';
import ProfileSettings from './ProfileSettings';

export const UserContext = createContext();

function App() {

  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);


  return (
    <div className='relative min-h-screen bg-black-2'>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path='/signup' element={<Registration/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/rent-a-car' element={<RentACar/>}/>
            <Route path='/profile-settings' element={<ProfileSettings/>}/>
          </Route>
        </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
