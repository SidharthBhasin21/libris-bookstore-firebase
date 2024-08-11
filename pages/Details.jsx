import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../src/context/firebase";
import { Button, Form } from "react-bootstrap";

const Details = () => {
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);
    const [qty, setQty] = useState(1);

    const params = useParams();
    // console.log(data);
    const firestore = useFirebase();

    const placeOrder = async () => {
        const res = await firestore.placeOrder(params.bookId, qty);
        console.log("Order placed", qty,params.bookId);
        console.log(res);
    }


    useEffect(() => {
        firestore.getBookById(params.bookId).then((book) => {
        // console.log(book.data());
        setData(book.data());
        });
    }, []);

    useEffect(() => {
        if (data) {
            // console.log(data);
            const imageURL = data.imageURL;
            firestore.getImgURL(imageURL).then((u) => setUrl(u))
    
    }
    }, [data]);

    if (data == null) return <h1>Loading...</h1>;

    return (
        <div className="container mt-5">
            <h1>{data.name}</h1>
            <img src={url} width='25%' style={{borderRadius: '20px'}} />
            <h2>Details:</h2>
            <h4>Rs: {data.price}</h4>
            <h4>ISBN: {data.isbnNumber}</h4>
            <h4>Owner: {data.displayName}</h4>
            <img src={data.userPhotoURL} width='50px' style={{borderRadius: '50%'}} />
            <h4>Email: {data.userEmail}</h4>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>quantity</Form.Label>
                <Form.Control
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                    type="number"
                    placeholder="Set quantity"
            />
            </Form.Group>
            <Button variant="success" onClick={placeOrder}>Buy Now</Button>
        </div>
    );
};

export default Details;
