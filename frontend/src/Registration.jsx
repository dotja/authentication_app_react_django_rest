import React, { useState } from 'react'
import { client }  from './Url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'


const Registration = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState('');
    const [isError, setIsError] = useState(false);

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
                      <FontAwesomeIcon icon={faEnvelope} className='absolute top-[14px] left-[12px] text-custom-gray'/>
                      <input 
                        className=' text-sm pl-10 py-3 placeholder-custom-gray bg-inherit w-full border-none rounded-sm text-custom-gray focus:outline-yellow focus:outline-none focus:outline-[1px]' 
                        type='email' 
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'/>
                   </div>
                   {/* Username Field */}
                   <div className='w-full lg:rounded rounded-sm bg-black-2 flex flex-row relative'>
                      <FontAwesomeIcon icon={faUser} className='absolute top-[14px] left-[12px] text-custom-gray'/>
                      <input 
                        className=' text-sm pl-10 py-3 placeholder-custom-gray bg-inherit w-full border-none rounded-sm text-custom-gray focus:outline-yellow focus:outline-none focus:outline-[1px]' 
                        type='text' 
                        name='email'
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                        placeholder='Username'/>
                   </div>
                   {/* Password Field */}
                   <div className='w-full lg:rounded rounded-sm bg-black-2 flex flex-row relative'>
                      <FontAwesomeIcon icon={faLock} className='absolute top-[14px] left-[12px] text-custom-gray'/>
                      <input 
                        className=' text-sm pl-10 py-3 placeholder-custom-gray bg-inherit w-full border-none rounded-sm text-custom-gray focus:outline-yellow focus:outline-none focus:outline-[1px]' 
                        type='password' 
                        name='email' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'/>
                   </div>
                   <button className='w-full py-2 hover:bg-yellow text-white mt-4 hover:text-black border border-yellow rounded' type='submit'>Sign Up</button>
                  </form>
                </div>            
            </div>    
      </div>
    </>
  )
}

export default Registration