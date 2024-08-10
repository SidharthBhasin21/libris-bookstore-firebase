import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from '../src/context/firebase';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Loggin in...');
        
        const res = await firebase.signInUser(email, password);
        console.log('Successfully logged in account!', res);
    }
    const handleGoogleSignIn = async (e ) => {
        e.preventDefault();
        console.log('Logging in with Google...');
        const user = await firebase.signInWithGoogle();
        console.log('Successfully logged in with Google!', user);
    }

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')
        }

    },[firebase, navigate])


    return (
    <div className='container mt-5'>
    <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            </Form.Group>

            <Button variant="success" type="submit" onClick={handleSubmit}>
                Login
            </Button>
        </Form>
        <h3 className='mt-5 mb-5'>OR</h3>
        <Button variant='danger' onClick={handleGoogleSignIn}>Login with Google</Button>
    </div>
    )
}

export default Login