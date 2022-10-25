import React from "react";

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
    // use useState hook to hold content
    const content = [];

    const fetchData = () => {
        // fetch all the books then store data into the state
        console.log(content);
    };

    // execute the fetchData when the component is mounted
    // using useEffect with the empty dependency list array

    const handleLoanBook = (book) => {
        // send request to toggle borrow/return book
        // then re-fetch data
        return () => console.log(book);
    };

    const handleRemoveBook = () => null;

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
