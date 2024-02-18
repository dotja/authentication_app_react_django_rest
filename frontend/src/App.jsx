import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import  Navbar from './Navbar'
import { client }  from './Url'
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Explore from './Explore';

function App() {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  // if (currentUser) {
  //   return (
  //     <div>

  //       <NavBar isLoggedIn={currentUser}/>
  //         <div className="center">
  //           <h2>You're logged in!</h2>
  //         </div>
  //       </div>
  //   );
  // }
  return (
    <div className='bg-black-2 h-lvh'>
      <Routes>
        <Route path='/' element={<Navbar  isLoggedIn={currentUser}/>}>
          <Route index element={<Home/>}/>
          <Route path='/signup' element={<Registration currentUser={currentUser}/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/explore' element={<Explore/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
