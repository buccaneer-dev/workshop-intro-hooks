import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import LibraryClient from "../library_client/LibraryClient";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validateImgURL = (value) => {
    const regex = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi);

    if (!value.match(regex)) {
        return (
            <div className="alert alert-danger" role="alert">
                The image URL must be a valid address.
            </div>
        );
    }
};

const Admin = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };
    const onChangeSubtitle = (e) => {
        const sub = e.target.value;
        setSubtitle(sub);
    };
    const onChangeAuthor = (e) => {
        const author = e.target.value;
        setAuthor(author);
    };
    const onChangeDescription = (e) => {
        const desc = e.target.value;
        setDescription(desc);
    };
    const onChangeImageURL = (e) => {
        const img = e.target.value;
        setImageURL(img);
    };

    const handleAddBook = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            LibraryClient.addNewBook(title, subtitle, author, description, imageURL).then(
                () => {
                    setMessage(`Added book '${title}' by ${author}`);
                    setSuccessful(true);
                },
                (error) => {
                    console.error(error);
                    setMessage(`Error adding book '${title}'`);
                    setSuccessful(false);
                },
            );
        }
    };

    return (
        <>
            <div className="jumbotron">
                <div className="container">
                    <h3>Add new book</h3>
                </div>
            </div>

            <div className="col-md-12">
                <div className="card-form card card-container card-add">
                    <Form onSubmit={handleAddBook} ref={form}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={onChangeTitle}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subtitle">Subtitle</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="subtitle"
                                value={subtitle}
                                onChange={onChangeSubtitle}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="author"
                                value={author}
                                onChange={onChangeAuthor}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageURL">Image URL</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="imageURL"
                                value={imageURL}
                                onChange={onChangeImageURL}
                                validations={[required, validateImgURL]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Submit</button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Admin;
