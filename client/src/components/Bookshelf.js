import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import LibraryClient from "../library_client/LibraryClient";

const POLLING_INTERVAL = 5000;

const BookCard = (props) => {
    const userCtx = useContext(UserContext);
    return (
        <div className="card card-book">
            <div className="card-horizontal">
                <div className="img-square-wrapper">
                    <img className="card-img" src={props.link} alt="book cover" />
                </div>
                <div className="card-body">
                    <h3 className="card-title">{props.title}</h3>
                    <h4 className="card-title">{props.subtitle}</h4>
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
            <div className="card-footer">
                <small className="text-muted">
                    Status: {props.borrowed ? `loaned by ${props.borrowed}` : "available"}
                </small>
                <div className="btns-loan">
                    {userCtx.hasPermission("books:delete") && (
                        <button className="btn btn-danger" onClick={props.handleRemove}>
                            Remove
                        </button>
                    )}
                    <button
                        className="btn btn-primary"
                        disabled={props.borrowed !== "" && props.borrowed !== userCtx.getUsername()}
                        onClick={props.handleLoan}
                    >
                        {props.borrowed === userCtx.getUsername() ? "Return" : "Borrow"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Boardshelf = () => {
    const [content, setContent] = useState([]);
    const userCtx = useContext(UserContext);

    const fetchData = () => LibraryClient.getAllBooks().then(setContent).catch(console.error);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // using interval instead of timeout to demonstrate cleanup function
        const timer = window.setInterval(() => fetchData(), POLLING_INTERVAL);
        return () => window.clearInterval(timer);
    }, [content]);

    const handleLoanBook = (book) => {
        return () =>
            LibraryClient.loanReturnBook(book.id, userCtx.getUsername(), book.borrowed)
                .then(fetchData)
                .catch(console.error);
    };

    const handleRemoveBook = (book) => {
        return () => LibraryClient.removeBook(book.id).then(fetchData).catch(console.error);
    };

    return (
        <>
            <div className="jumbotron">
                <div className="container">
                    <h3>Bookshelf</h3>
                </div>
            </div>
            <div className="container">
                {content &&
                    content.map((book) => (
                        <BookCard
                            key={book.id}
                            {...book}
                            handleLoan={handleLoanBook(book)}
                            handleRemove={handleRemoveBook(book)}
                        />
                    ))}
            </div>
        </>
    );
};

export default Boardshelf;
