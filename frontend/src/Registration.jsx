import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { client }  from './Url'
import { UserContext } from './App'
import { Navigate } from 'react-router-dom';
import email_icon from '/email_icon.svg';
import username_icon from '/username_icon.svg';
import password_icon from '/password_icon.svg';


const Registration = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState('');
    const [isError, setIsError] = useState(false);
    
    // const [currentUser, setCurrentUser] = useContext(UserContext);

    function submitRegistration(e) {
        e.preventDefault();
        try {
            client.post(
                "/register",
                {
                  email: email,
                  username: username,
                  password: password
                }
              ).then((response) => {
          
                if(response.status === 201){
                  console.log(response.data);
                  const successToast = "Successfully created!";
                  handleToast(successToast);
                  console.log(successToast);
                  email = '';
                  username = '';
                  password = '';
              
                }
            
              }).catch((error) => {
                console.error(error.response.data); 
                if(error.response.data && error.response){
                  const invalidToast = error.response.data; 
                  handleToast(invalidToast);
                  setIsError(true);
                } 
              });
        } catch (error) {
            console.error("An unexpected error occured during the HTTP request.", error);
        }
      }

    function handleToast(toast){
      setToast(toast);
  }
  return (
    <>
      <div className='flex items-center justify-center h-screen w-full'>
            <div className='border-2 border-yellow rounded-xl bg-black w-96'>
                <div className='flex flex-col p-8 space-y-6'>
                  <div className='text-xl leading-tight tracking-tight text-white pb-4'>
                      Sign up
                  </div>
                  <span id='span_toast' className={`text-[12px] w-full py-1  ${isError ? 'bg-red-600': 'bg-green-600'}  text-center rounded-1 text-white ${toast ? '' : 'hidden'}`}>{toast}</span>
                  
                  <form className='grid gap-4' onSubmit={e => submitRegistration(e)}>
                    {/* Email Field */}
                   <div className='w-full lg:rounded rounded-sm bg-black-2 flex flex-row relative'>
                      <img className='absolute top-[18px] left-[12px]' src={email_icon}/>
                      <input className=' text-sm pl-10 py-3 placeholder-custom-gray bg-inherit w-full border-none rounded-sm text-custom-gray' 
                        type='email' 
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'/>
                   </div>
                   {/* Username Field */}
                   <div className='w-full lg:rounded rounded-sm bg-black-2 flex flex-row relative'>
                      <img className='absolute top-[18px] left-[12px]' src={username_icon}/>
                      <input className=' text-sm pl-10 py-3 placeholder-custom-gray bg-inherit w-full border-none rounded-sm text-custom-gray' 
                        type='text' 
                        name='email'
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                        placeholder='Username'/>
                   </div>
                   {/* Password Field */}
                   <div className='w-full lg:rounded rounded-sm bg-black-2 flex flex-row relative'>
                      <img className='absolute top-[18px] left-[12px]' src={password_icon}/>
                      <input className=' text-sm pl-10 py-3 placeholder-custom-gray bg-inherit w-full border-none rounded-sm text-custom-gray' 
                        type='password' 
                        name='email' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'/>
                   </div>
                   <button className='w-full py-2 bg-yellow text-white' type='submit'>Sign Up</button>
                  </form>
                </div>            
            </div>    
      </div>
    </>
  )
}

export default Registration