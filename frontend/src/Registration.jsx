import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { client }  from './Url'

const Registration = ({ currentUser }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
              ).then(function(res) {
                client.post(
                  "/login",
                  {
                    email: email,
                    password: password
                  }
                ).then(function(res) {
                  // currentUser = true;
                });
              });
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <div className="center">
            <Form onSubmit={e => submitRegistration(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
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

export default Registration