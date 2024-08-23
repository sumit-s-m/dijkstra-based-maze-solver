// Library Imports
import React, { useRef, useState } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//Component Imports
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
    //Reference variables for input fields (email, password and password conformation)
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup } = useAuth();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //Handle the request for Signup
    async function handleSubmit(event) {
        event.preventDefault();

        console.log(passwordRef.current.value.length);

        //Checking if password is more than 6 charecters long
        if (
            passwordRef.current.value.length < 6 ||
            passwordConfirmRef.current.value.length < 6
        ) {
            return setError(
                "Password should be atleast 6 charecters in length"
            );
        }

        //Checking that password and the password confirm field match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);

            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            await signup(email, password);

            history.push("/add-username");
        } catch {
            setError("Failed to create an account.");
        }

        setLoading(false);
    }

    //UI for Signup page
    return (
        <center>
            <div className="signup mt-5 w-100">
                <Card className="signup-card">
                    <Card.Body>
                        <h2 className="signup-text text-center mb-4">
                            Sign Up
                        </h2>

                        {/* Show error on failure to sign up */}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    ref={emailRef}
                                />
                            </Form.Group>

                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    ref={passwordRef}
                                />
                            </Form.Group>

                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    ref={passwordConfirmRef}
                                />
                            </Form.Group>

                            <button
                                className="w-100 btn btn-outline-primary"
                                type="submit"
                                disabled={loading}>
                                Sign Up
                            </button>
                        </Form>
                    </Card.Body>
                </Card>

                <div
                    className="w-100 text-center mt-2"
                    style={{ color: "white" }}>
                    Already have an account?{" "}
                    <Link className="btn btn-primary btn-sm" to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </center>
    );
}
