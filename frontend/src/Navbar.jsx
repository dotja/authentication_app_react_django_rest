import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo  from '/lucaren-logo.svg'
import { UserContext } from './App'
import { client } from './Url'
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    // const image_placeholder = <FontAwesomeIcon icon={faUser}/>;
    function submitLogout(e) {
        e.preventDefault();
        client.post(
          "/logout",
          {withCredentials: true}
        ).then(function(res) {
          setCurrentUser(false);
        });
      }
    function openModal(){

        if(!isOpen){
            setIsOpen(true);
        }else{
            setIsOpen(false);
        }
        
    }

    // const baseUrl = "http://localhost:8000"
    // const imagePath = userProfile ? userProfile : image_placeholder;
    // console.log("Nav: ", baseUrl + imagePath);
    // console.log("Username: ", userName);


  return (
    <>
    <div className='fixed z-10 flex flex-row items-center justify-between w-full px-4 py-2 mx-auto text-white bg-black md:px-8 xl:px-20 flex-nowrap'>
        <div>
            <img src={Logo} alt="Lucaren logo" />
        </div>
        <div className='hidden md:block'>
            <ul className='grid content-start grid-cols-3 gap-4 p-0 m-0'>
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
                <>
                
                <div className="flex flex-row items-center gap-x-3">
                    <div>dasda:</div> 
                    <button 
                        className=' bg-slate-600 md:w-[40px] md:h-[40px] h-[32px] w-[32px] rounded-full flex items-center justify-center'
                        onClick={openModal}
                        >
                        <FontAwesomeIcon icon={faUser}/>
                        {/* <img src={image_placeholder} alt="pfp" className='rounded-full object-cover cursor-pointer w-[64px] h-[64px]'/> */}
                    </button>
                    {/* Modal */}
                    {isOpen && (
                        <div 
                            className='fixed flex bg-black border border-black2 z-10 right-12 w-[300px] flex-col rounded shadow-md shadow-black py-4 px-4 top-16'
                            id='myModal'>
                            <div className='px-4 py-1 mb-4 bg-slate-400'>
                                <div>
                                Your profiledsa
                                </div>
                            </div>
                            <div >
                                <Link to='/profile-settings' className='px-4 py-2 mb-4 bg-slate-400'>Profile Settings</Link>
                            </div>  
                            <form onSubmit={submitLogout}>             
                                    <button 
                                        type='submit' 
                                        className='flex items-center justify-center px-4 py-2 hover:text-yellow bg-slate-400'>
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-2 hover:text-yellow'/>
                                        Log out
                                    </button>
                            </form>  
                        </div>
                    )}
                </div>    
                </>
            ) : (
                <div className='grid grid-cols-2 gap-4'>
                    <button>
                        <Link to='/login' className='no-underline text-slate-100 hover:text-yellow'>Sign In</Link> 
                    </button>
                    <button className='py-2 rounded shadow-lg bg-yellow lg:px-4 md:px-2 hover:bg-amber-300'>
                        <Link to='/signup' className='text-black no-underline'>Sign Up</Link> 
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