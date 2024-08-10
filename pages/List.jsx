import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../src/context/firebase";

const ListingPage = () => {
    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState("");
    
    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
    }

    return (
        <div className="container mt-5">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter Book name"
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
                onChange={(e) => setIsbnNumber(e.target.value)}
                value={isbnNumber}
                type="text"
                placeholder="ISBN"
            />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text"
                placeholder="Enter Price "
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCoverPic">
            <Form.Label>CoverPic</Form.Label>
            <Form.Control
                onChange={(e) => setCoverPic(e.target.files[0])}
                type="file"
                
            />
            </Form.Group>

            <Button variant="success" type="submit" onClick={handleSubmit}>
                Upload
            </Button>
        </Form>
        </div>
    );
};

export default ListingPage;
