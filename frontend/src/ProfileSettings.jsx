import React, { useContext, useEffect, useState } from 'react'
import { client } from './Url';
import {UserContext} from './App';
import { useNavigate } from 'react-router-dom';
import profilePlaceholder from '/profile_placeholder.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const ProfileSettings = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',   
        contact: '',
        user_profile: '',
    });

    useEffect(() => {
        console.log(currentUser);
        if(currentUser){
            fetchUserData();
        }else{
            navigate('/');
        }
    }, [currentUser, history]);

    const fetchUserData = async () => {
        try{
            const response = await client.get('/user');
            const userData = response.data;
            console.log(userData);

            setFormData({
                username: userData.username,
                email: userData.email,
                firstname: userData.firstname,
                lastname: userData.lastname,
                password: userData.password,
                contact: userData.contact,
                user_profile: userData.user_profile,
            });
        }catch(error){
            console.error('Error fetching the data: ', error);
        }
    }
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: files ? files[0]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('firstname', formData.firstname);
            formDataToSend.append('password', formData.lastname)
            formDataToSend.append('password', formData.password);
            formDataToSend.append('contact', formData.contact);
            formDataToSend.append('user_profile', formData.user_profile);

            const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
            
            // console.log(csrfToken);
            const response = await client.put('/user/profile', formDataToSend,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log("Profile Updated: ", response.data);
        } catch (error) {
            console.error("Error updating the profile: ", error);
        }
    };

    const baseUrl = "http://localhost:8000"
    const imagePath = formData.user_profile ? formData.user_profile : profilePlaceholder
    console.log(baseUrl + imagePath)
  return (
    <>
    <div className='flex justify-center h-full pt-20 mx-auto text-white md:w-10/12'>
        
        <div className='md:mx-10 w-[700px] py-6'>
            <div className='text-lg'>Profile Settings</div>
            <form onSubmit={handleSubmit}  className='flex justify-center gap-8 mt-10'>
                <div className='flex flex-col items-center space-y-6'>
                    <div className='relative flex flex-row items-start gap-4'>
                        <input 
                            type="text"  
                            name='username' 
                            value={formData.username} 
                            onChange={handleChange}
                            className='px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow'
                        />
                        <label htmlFor='username' className='absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow'>Username</label>
                        <div className='relative'>
                        <input 
                            type="email"  
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange}
                            className='px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow'
                        />
                        <label htmlFor='username' className='absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow'>Email</label>
                    </div>
                    </div>
                    <div className='relative flex flex-row items-start gap-4'>
                        <input 
                            type="text"  
                            name='firstname' 
                            value={formData.firstname} 
                            onChange={handleChange}
                            className='px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow'
                        />
                        <label htmlFor='firstname' className='absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow'>Firstname</label>
                        <div className='relative '>
                        <input 
                            type="text"  
                            name='lastname' 
                            value={formData.lastname} 
                            onChange={handleChange}
                            className='px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow'
                        />
                        <label htmlFor='lastname' className='absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow'>Lastname</label>
                    </div>
                    </div>
                    <div className='relative flex flex-row items-start gap-4'>
                        <div className='relative'>
                            <input 
                                type="password"  
                                name='password' 
                                value={formData.password} 
                                onChange={handleChange}
                                className='px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow'
                            />
                            <label htmlFor='password' className='absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow'>Password</label>
                        </div>
                        <div className='relative'>
                            <input 
                                type="number"  
                                name='contact' 
                                value={formData.contact} 
                                onChange={handleChange}
                                className='px-4 py-2 mt-2 text-gray-400 border-b-2 peer focus:outline-none bg-inherit focus:border-b-yellow'
                            />
                            <label htmlFor='contact' className='absolute left-0 text-sm font-light -top-3 peer-focus:text-yellow'>Contact No.</label>
                        </div>
                    </div>
                    <button 
                        type='submit' 
                        className='px-4 py-2 text-sm border-none rounded outline-none text-yellow ring-1 ring-yellow hover:bg-yellow hover:text-white '>Confirm Changes
                    </button>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <label htmlFor='user_profile'>Change Profile</label>
                        <label htmlFor="user_profile" className='flex flex-col items-center justify-center gap-8 cursor-pointer'>
                            <img 
                                src={baseUrl + imagePath}
                                alt="profile picture" 
                                className='rounded-full object-cover cursor-pointer w-[150px] h-[150px] border-2 p-1 border-yellow hover:border-white'
                            />
                            <span className='pb-1 duration-75 hover:border-b-2 hover:text-yellow hover:border-b-yellow'>
                                <FontAwesomeIcon icon={faUpload} className='mr-2'/>
                                Upload Profile
                            </span>
                            <input
                            id='user_profile'
                            type="file"  
                            name='user_profile' 
                            onChange={handleChange}   
                            className='hidden'
                            />
                        </label>
                    
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default ProfileSettings