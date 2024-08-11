import React, { useEffect, useState } from "react";
import { useFirebase } from "../src/context/firebase";
import MyCard from "../components/MyCard";
import { CardGroup } from "react-bootstrap";

const Home = () => {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  
  useEffect(() => {
    firebase.listAllBooks().then((books) => {
      // console.log(books.docs[0].data())
      setBooks(books.docs);
    });
    
  }, []);
  return (
    <div className="container">
      <CardGroup>
        {books.map((book) => {
          return (
            <MyCard  key= {book.id} id = {book.id} {...book.data()} / >
          );
        })}
      </CardGroup>
    </div>
  );
};

export default Home;
