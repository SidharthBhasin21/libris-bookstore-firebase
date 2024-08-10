import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../src/context/firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()


    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Creating account...');
        
        const res = await firebase.signUpUserWithEmailAndPassword (email, password);
        console.log('Successfully created account!', res);
    }

    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')
        }

    },[firebase, navigate])



    return (
        <div className="container mt-5">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
            />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
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

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Create account
            </Button>
        </Form>
        </div>
    );
};

export default Register;
