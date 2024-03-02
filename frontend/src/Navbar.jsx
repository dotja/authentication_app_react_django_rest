import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo  from '/lucaren-logo.svg'
import { UserContext } from './App'
import { client } from './Url'
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({
        username: '',
        user_profile: '',
    });
    const image_placeholder_small = '/images/profile_placeholder_small.jpg';
 

    useEffect(() => {
        if(currentUser){
            fetchUserData();
        }
    }, [userProfile.user_profile, userProfile.username, currentUser]);

    const fetchUserData = async () => {

        try {
            const response = await client.get('/user');
            const userData = response.data;

            setUserProfile({
                username: userData.username,
                user_profile: userData.user_profile,
            })
            console.log("profile: ", userProfile)
            console.log("profile from request: ", userData.user_profile)
        } catch (error) {
            console.error("Errot fetching user data: ", error)
        }
    } 
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

    const baseUrl = "http://localhost:8000"
    const imagePath = userProfile.user_profile ? userProfile.user_profile : image_placeholder_small;
    console.log("Nav: ", baseUrl + imagePath);
    console.log("Image ", userProfile);


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
                    <div>{userProfile.username}</div> 
                    <button 
                        className='h-[32px] w-[32px] flex items-center justify-center rounded-s-full 
                        md:w-[48px] md:h-[48px]  border border-yellow p-1 rounded-full hover:p-0'
                        onClick={openModal}
                        >
                        <img src={baseUrl + imagePath} alt="pfp" className='rounded-full'/>
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