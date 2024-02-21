import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { client }  from './Url'
import { UserContext } from './App'
import { Navigate } from 'react-router-dom';
 
const Registration = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState('');
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
                }
              }).catch((error) => {
                console.error(error.response.data); 
                if(error.response.data && error.response){
                  // setError(error.response.data);
                  const invalidToast = error.response.data; 
                  handleToast(invalidToast);
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
    // <div className="center">
    //         <h1>{toast}</h1>
    //         <Form onSubmit={e => submitRegistration(e)}>
    //           <Form.Group className="mb-3">  
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
    //             <Form.Text className="text-muted">
    //               We'll never share your email with anyone else.
    //             </Form.Text>
    //           </Form.Group>
    //           <Form.Group className="mb-3" controlId="formBasicUsername">
    //             <Form.Label>Username</Form.Label>
    //             <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
    //           </Form.Group>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    //           </Form.Group>
    //           <Button variant="primary" type="submit">
    //             Submit
    //           </Button>
    //         </Form>
    //   </div>    
    <>
      <div className='flex items-center justify-center mx-auto md:h-screen lg:py-0'>
            {/* <div className='border-2 rounded-md max-h-md border-yellow max-w-96'>
                <div className='flex flex-col p-8 space-y-6'>
                  <div className='text-xl font-bold leading-tight tracking-tight'>
                      Sign up to create an account
                  </div>
                </div>            
            </div> */}
          
      </div>
    </>
  )
}

export default Registration