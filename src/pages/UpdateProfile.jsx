//Library Imports
import React, { useRef, useState } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//Component Imports
import { useAuth } from "../components/contexts/AuthContext";

export default function UpdateProfile() {
    //Reference variable for input fields (password and password conformation)
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { updatePassword } = useAuth();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //Handle Update Profile Request
    function handleSubmit(event) {
        event.preventDefault();

        //Checking if passwords match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];

        setLoading(true);
        setError("");

        //Update password
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setError("Failed to update account.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    //UI for Update Profile page
    return (
        <center>
            <div className="update-profile mt-5 w-100">
                <Card className="update-profile-card">
                    <Card.Body>
                        <h2 className="update-profile-text text-center mb-4">
                            Update Profile
                        </h2>

                        {/* Display error on failure to update profile */}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Leave Blank to keep the same."
                                />
                            </Form.Group>

                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordConfirmRef}
                                    placeholder="Leave Blank to keep the same."
                                />
                            </Form.Group>

                            <button
                                className="btn btn-outline-primary w-100"
                                type="submit"
                                disabled={loading}>
                                Update
                            </button>
                        </Form>
                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    <Link className="btn btn-outline-primary" to="/">
                        Cancel
                    </Link>
                </div>
            </div>
        </center>
    );
}
