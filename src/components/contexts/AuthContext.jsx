// Library Imports
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../auth/firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Set the current user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    //Firebase method Signup
    function signup(email, password, username) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    //Firebase method Login
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    //Firebase method Logout
    function logout() {
        return auth.signOut();
    }

    //Firebase method Reset Password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    //Firebase method Update Email
    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    //Firebase method Update Password
    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    //Firebase method Delete User
    function deleteUser() {
        const username = currentUser.displayName;

        const user = {
            username: username,
        };

        //Webhook call to MongoDB Realm to delete the user from the Mongo Database
        axios
            .post(
                "https://webhooks.mongodb-realm.com/api/client/v2.0/app/newos-ytvpv/service/newos-users/incoming_webhook/deleteUser",
                user
            )
            .then((res) => {
                console.log("User Deleted");
                return currentUser.delete();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Firebase method Update Username
    function updateUsername(name) {
        return currentUser
            .updateProfile({
                displayName: name,
            })
            .then(function () {})
            .catch(function (error) {
                console.log("Username update unsuccessful", error);
            });
    }

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateUsername,
        deleteUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
