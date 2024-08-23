// Library Imports
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

//Component Imports
import { useAuth } from "../components/contexts/AuthContext";

export default function DeleteAccount() {
    const { deleteUser } = useAuth();
    const history = useHistory();

    const [deletingUser, setDeletingUser] = useState(false);

    //Handle click for No
    function handleClickNo() {
        history.push("/");
    }

    //Handle click for Yes
    function handleClickYes() {
        setDeletingUser(true);
        deleteUser();
        setDeletingUser(false);
    }

    //UI for Delete Account page
    return (
        <center>
            <div className="delete-account-page">
                <Card className="delete-account-card">
                    <Card.Body>
                        <h2 className="w-100">Account Deletion</h2>
                        <p>
                            <strong>
                                Are you sure you want to delete your account?
                            </strong>
                        </p>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-around ">
                        <button
                            className="btn btn-outline-danger btn-lg w-50 ml-1"
                            onClick={handleClickYes}>
                            {deletingUser ? "Deleting User..." : "Yes"}
                        </button>
                        <button
                            className="btn btn-outline-success btn-lg w-50 ml-1"
                            onClick={handleClickNo}>
                            No
                        </button>
                    </Card.Footer>
                </Card>
            </div>
        </center>
    );
}
