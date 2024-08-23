//Library Imports
import React, { useRef, useState } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

//Component Imports
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
    //Reference variable for input field (email)
    const emailRef = useRef();

    const { resetPassword } = useAuth();

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    //Handle the request for new password
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Chech your inbox for further instructions.");
        } catch {
            setError("Failed to reset password.");
        }

        setLoading(false);
    }

    //UI for the Forgot Password page
    return (
        <center>
            <div className="forgot-password mt-5 w-100">
                <Card className="forgot-password-card">
                    <Card.Body>
                        <h2 className="password-reset-text text-center mb-4">
                            Password Reset
                        </h2>

                        {/* Show error for failed request attempt */}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Show success message for successful request */}
                        {message && <Alert variant="success">{message}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    required
                                    ref={emailRef}
                                />
                            </Form.Group>

                            <button
                                className="btn btn-outline-primary w-100"
                                type="submit"
                                disabled={loading}>
                                Reset Password
                            </button>
                        </Form>

                        <div className="text-center mt-3">
                            <Link
                                className="btn btn-outline-primary"
                                to="/login">
                                Login
                            </Link>
                        </div>
                    </Card.Body>
                </Card>

                <div
                    className="w-100 text-center mt-2"
                    style={{ color: "white" }}>
                    Need an account?{" "}
                    <Link className="btn btn-primary btn-sm" to="/signup">
                        Sign Up
                    </Link>
                </div>
            </div>
        </center>
    );
}
