// Library Imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";

//Component Imports
import { useAuth } from "../components/contexts/AuthContext";

//devexteme CSS
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.dark.css";

let favouriteAstroidArray = [];

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    const { currentUser } = useAuth();

    useEffect(() => {
        let favouriteAstroids = {};

        //Retrieve Favourite Asteroids from MongoDB database
        async function loadFavouriteAstroids() {
            //Reterieve the user's username
            const username = currentUser.displayName;

            //Create an object with the username to be sent to the MongoDB Realm webhook
            const user = {
                username: username,
            };

            console.log(user);

            //Webhook call to MongoDB Realm with the username object as a parameter to retreive the user's favourite astroids from Mongo Database
            await axios
                .post(
                    "https://webhooks.mongodb-realm.com/api/client/v2.0/app/newos-ytvpv/service/newos-users/incoming_webhook/returnFavouriteAstroids",
                    user
                )
                .then((res) => {
                    favouriteAstroids = res.data[0].favouriteAstroids;
                })
                .catch((err) => {
                    console.log(err);
                });

            //Unpack favourite asteroids from the object of result from webhook
            Object.keys(favouriteAstroids).forEach(function (key) {
                const level1 = favouriteAstroids[key];

                Object.keys(level1).forEach(function (key1) {
                    const elementsToPush = {
                        astroidId: level1[key1].astroidId,
                        astroidName: level1[key1].astroidName,
                        orbitalDeterminationDate:
                            level1[key1].orbitalDeterminationDate,
                    };

                    favouriteAstroidArray.push(elementsToPush);
                });
            });

            setLoading(false);
        }

        loadFavouriteAstroids();
    }, [currentUser]);

    //UI for the Dashboard page
    return (
        <center>
            <div className="dashboard mt-5 mb-5">
                {loading ? (
                    <div>
                        <div
                            className="spinner-border text-warning"
                            role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div
                            className="profile-card w-100"
                            style={{ maxWidth: "400px" }}>
                            <Card className="user-info">
                                <Card.Body className="text-center">
                                    <h2 className="profile-text text-center mb-4">
                                        Profile
                                    </h2>
                                    <strong className="label-text">
                                        Username:
                                    </strong>{" "}
                                    {currentUser.displayName}
                                    <br></br>
                                    <strong className="label-text">
                                        Email:
                                    </strong>{" "}
                                    {currentUser.email}
                                    <br></br>
                                    <Link
                                        to="/update-profile"
                                        className="btn btn-outline-primary w-72 mt-3">
                                        Change Password
                                    </Link>
                                </Card.Body>

                                <div className="w-100 text-center mb-2">
                                    <Link
                                        to="/delete-account"
                                        className="btn btn-outline-danger w-72 mt-2">
                                        Delete Account
                                    </Link>
                                </div>
                            </Card>
                        </div>

                        {/* Devextreme grid to display favourite asteroids */}
                        <DataGrid
                            className="mt-5"
                            id="astroidId"
                            dataSource={favouriteAstroidArray}
                            showBorders={true}
                            keyExpr="astroidId"
                            wordWrapEnabled={true}
                            rowAlternationEnabled={true}
                            showColumnLines={true}>
                            <Paging defaultPageSize={5} />

                            <Column
                                dataField="orbitalDeterminationDate"
                                defaultSortIndex={1}
                                defaultSortOrder="asc"
                                caption="Determination Date"
                                alignment="center"
                            />

                            <Column
                                dataField="astroidId"
                                caption="Asteroid Id"
                                alignment="center"
                            />

                            <Column
                                dataField="astroidName"
                                caption="Asteroid Name"
                                alignment="center"
                            />
                        </DataGrid>
                    </div>
                )}
            </div>
        </center>
    );
}
