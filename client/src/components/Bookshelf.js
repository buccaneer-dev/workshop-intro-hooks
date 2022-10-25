import React, { useEffect, useState } from "react";

import LibraryClient from "../library_client/LibraryClient";

const POLLING_INTERVAL = 5000;

const BookCard = (props) => {
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
                    {props.canDelete && (
                        <button className="btn btn-danger" onClick={props.handleRemove}>
                            Remove
                        </button>
                    )}
                    <button
                        className="btn btn-primary"
                        disabled={props.borrowed !== "" && props.borrowed !== props.username}
                        onClick={props.handleLoan}
                    >
                        {props.borrowed === props.username ? "Return" : "Borrow"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Boardshelf = (props) => {
    const [content, setContent] = useState([]);

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
            LibraryClient.loanReturnBook(book.id, props.username, book.borrowed)
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
                            handleRemove={handleRemoveBook}
                            canDelete={props.canDelete}
                            username={props.username}
                        />
                    ))}
            </div>
        </>
    );
};

export default Boardshelf;
