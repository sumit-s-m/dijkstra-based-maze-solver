// Library Imports
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Component Imports
import PrivateRoute from "./PrivateRoute";

import AuthProvider from "./contexts/AuthContext";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";

import MainPage from "../pages/MainPage";
import SearchAsteroidById from "../pages/SearchAsteroidById";
import SearchAsteroidsByDates from "../pages/SearchAsteroidsByDates";
import AddUsername from "../pages/AddUserame";
import Navbar from "../pages/Navbar";
import Dashboard from "../pages/Dashboard";
import UpdateProfile from "../pages/UpdateProfile";
import DeleteAccount from "../pages/DeleteAccount";

function App() {
    return (
        <div className="App">
            <Container>
                <div className="app-body">
                    {/* Routes for pages */}
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/"
                                    component={MainPage}
                                />
                                <PrivateRoute
                                    exact
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact
                                    path="/search-asteroid-id/:asteroidId"
                                    component={SearchAsteroidById}
                                />
                                <PrivateRoute
                                    exact
                                    path="/search-asteroid-dates/:startDate&:endDate"
                                    component={SearchAsteroidsByDates}
                                />
                                ;
                                <PrivateRoute
                                    exact
                                    path="/update-profile"
                                    component={UpdateProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/add-username"
                                    component={AddUsername}
                                />
                                <PrivateRoute
                                    exact
                                    path="/navbar"
                                    component={Navbar}
                                />
                                <PrivateRoute
                                    exact
                                    path="/delete-account"
                                    component={DeleteAccount}
                                />
                                <Route path="/login" component={Login} />
                                <Route path="/signup" component={Signup} />
                                <Route
                                    path="/forgot-password"
                                    component={ForgotPassword}
                                />
                            </Switch>
                        </AuthProvider>
                    </Router>
                </div>
            </Container>
        </div>
    );
}

export default App;
