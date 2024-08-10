import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../src/context/firebase';

const MyCard = (props) => {
    const [url, setUrl] = useState("");
    const firebase = useFirebase();

    useEffect(() => {
        firebase.getImgURL(props.imageURL).then((r) => setUrl(r))
    },[])

    return (
        <Card style={{ width: "18rem", margin: '10px' }}>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        Price: {props.price}
                    </Card.Text>
                    <Card.Text>
                        ISBN: {props.isbnNumber}
                    </Card.Text>
                    <Button variant="primary" onClick={firebase.deleteObj()}>Go somewhere</Button>
                </Card.Body>
        </Card>
    )
}

export default MyCard