import React, { useContext, useState } from 'react'
import { client }  from './Url'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';

import { UserContext } from './App';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useContext(UserContext);


    function submitLogin(e) {
        e.preventDefault();
        client.post(
          "/login",
          {
            email: email,
            password: password
          }
        ).then(function(res) {
          setCurrentUser(true);
        });
      }

      if(currentUser){
        return(
          <>
            <Navigate to='/explore' />
          </>
        )
      }
  return (
    <div className="center">
    <Form onSubmit={e => submitLogin(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  )
}

export default Login