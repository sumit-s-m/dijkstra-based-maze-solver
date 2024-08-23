// Library Imports
import React from "react";
import { Redirect, Route } from "react-router-dom";

//Component Imports
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        //Check if user is logged in or return to login page
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
}
