import React, { useContext } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Logo  from '/lucaren-logo.svg'
import { UserContext } from './App'
import { client } from './Url'

const Navbar = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);

    function submitLogout(e) {
        e.preventDefault();
        client.post(
          "/logout",
          {withCredentials: true}
        ).then(function(res) {
          setCurrentUser(false);
        });
      }

  return (
    <>
    <div className='flex flex-row flex-nowrap items-center justify-center justify-between
    bg-black text-white w-screen m-0 px-4 py-2'>
        <div>
            <img src={Logo} alt="Lucaren logo" />
        </div>
        <div>
            <ul className='grid  grid-cols-3 gap-4 content-start p-0 m-0'>
                <li>
                    <Link to='/' className='no-underline hover:text-amber-300 text-slate-100'>Home</Link>
                </li>
                <li>
                    <Link to='/explore' className='no-underline text-slate-100 hover:text-amber-300'>Explore</Link>
                </li>
                <li>
                    <Link to='/rent-a-car' className='no-underline text-slate-100 hover:text-amber-300'>Rent a Car</Link>
                </li>
            </ul>
        </div>
        {
            currentUser ? (
                <form onSubmit={submitLogout}>
                    <button type='submit'>Log out</button>
                </form>
            ) : (
                <div className='grid grid-cols-2 gap-4'>
                    <button>
                        <Link to='/login' className='no-underline text-slate-100 hover:text-yellow'>Sign In</Link> 
                    </button>
                    <button className='bg-yellow lg:px-4 md:px-2 py-2 rounded hover:bg-amber-300 shadow-lg'>
                        <Link to='/signup' className='no-underline text-black'>Sign Up</Link> 
                    </button>
                </div>
            )
        }
    </div>
    <Outlet/>
    </>

  )
}

export default Navbar