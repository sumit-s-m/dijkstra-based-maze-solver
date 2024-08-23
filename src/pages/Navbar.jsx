//Library Imports
import React from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

//Component Imports
import { useAuth } from "../components/contexts/AuthContext";

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    //Handle Logout request
    async function handleLogout() {
        try {
            await logout();
            history.push("/login");
        } catch {
            console.log("Failed to log out.");
        }
    }

    //UI for Navbar
    return (
        <Router>
            <div>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand btn btn-dark" href="/">
                        NeoWs
                    </a>

                    {!currentUser ? (
                        <div className="form-inline">
                            <a
                                className="btn btn-outline-success mr-sm-2"
                                href="/login">
                                Login
                            </a>
                        </div>
                    ) : (
                        <div className="form-inline">
                            <a
                                className="btn btn-outline-light mr-sm-3"
                                href="/dashboard">
                                {currentUser.displayName}
                            </a>

                            <button
                                className="mr-sm-2 btn btn-outline-danger"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </Router>
    );
}
