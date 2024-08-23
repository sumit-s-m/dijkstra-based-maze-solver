//Library Imports
import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Button from "devextreme-react/button";

//Component Imports
import { auth } from "../components/auth/firebase";

let favouriteAstroidArray = [];

export default class SearchAsteroidById extends React.Component {
    constructor(props) {
        super(props);

        //State Variables
        this.state = {
            astroidData: {},
            loading: true,
            addingAstroidsLoading: false,
            currentUser: auth.currentUser,
            message: "",
            show: false,
        };

        this.AlertDismissible = this.AlertDismissible.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //Contact API for the data
    async componentDidMount() {
        // Api Key
        const apiKey = "8Y2qxegMmSkdHok4yoOjRm9HASPZpTgkQhwcZ6Aj";
        const asteroidId = this.props.match.params.asteroidId;
        const url =
            `https://api.nasa.gov/neo/rest/v1/neo/` +
            asteroidId +
            `?api_key=` +
            apiKey;

        //Wait until server responds with the required data
        const response = await fetch(url);

        //Convert the API response into JSON format
        const data = await response.json();

        this.setState({ astroidData: data });
        this.setState({ loading: false });
    }

    //Dynamic Add to favourites button
    AlertDismissible() {
        return (
            <div className="mt2" style={{ maxWidth: "300px" }}>
                <Alert show={this.state.show} variant="success">
                    <Alert.Heading>Success!!</Alert.Heading>

                    <p>Asteroid(s) added to favourites.</p>
                    <hr />

                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => this.setState({ show: false })}
                            variant="outline-success">
                            Close
                        </Button>
                    </div>
                </Alert>

                {!this.state.show && (
                    <Button
                        className="btn btn-primary align-middle mt-3 mb-4"
                        onClick={this.handleClick}>
                        {this.state.addingAstroidsLoading
                            ? "Loading..."
                            : "Add to Favourites"}
                    </Button>
                )}
            </div>
        );
    }

    //Handle click to add asteroid to favourites
    handleClick(event) {
        this.setState({ addingAstroidsLoading: true });

        let elementsToPush = {
            astroidId: this.state.astroidData.id,
            astroidName: this.state.astroidData.name,
            orbitalDeterminationDate: this.state.astroidData.orbital_data
                .orbit_determination_date,
        };

        favouriteAstroidArray.push(elementsToPush);

        //Packaging username and asteroid details into an object to send to MongoDB Realm Webhook
        const favourites = {
            username: this.state.currentUser.displayName,
            favouriteAstroids: favouriteAstroidArray,
        };

        //Webhook call to MongoDB Realm to add the asteroid to the user's favouriteAsteroids array
        axios
            .post(
                "https://webhooks.mongodb-realm.com/api/client/v2.0/app/newos-ytvpv/service/newos-users/incoming_webhook/addAstroid",
                favourites
            )
            .then((res) => {
                this.setState({ message: "Asteroid(s) added to favourites." });
                this.setState({ show: true });
                this.setState({ addingAstroidsLoading: false });

                this.onClearButtonClicked();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //UI for Search Asteroid by ID page
    render() {
        return (
            <center>
                <div>
                    <h2 className="neo-lookup-heading mt-3">Neo - Lookup</h2>

                    {this.state.loading ? (
                        <div>
                            <div
                                className="spinner-border text-warning"
                                role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    ) : (
                        <div className="individual-asteroid-data-text">
                            <center>
                                <p className="neo-lookup-description-text mt-4 ml-4 mr-4">
                                    The below table shows the details of the
                                    asteroid with the Asteroid Id{" "}
                                    <strong>{this.state.astroidData.id}</strong>{" "}
                                    and
                                    <strong>
                                        {this.props.match.params.endDate}
                                    </strong>
                                    . The asteroids are ordered based on their
                                    closest approach date to earth. The
                                    asteroids can be added to favourites to be
                                    viewed on a later date.
                                </p>

                                {/* Table that displays asteroid details for given ID */}
                                <table className="individual-asteroid-table mt-3">
                                    <tbody className="ml-2 mr-2">
                                        <tr>
                                            <th>Asteroid ID</th>
                                            <td>{this.state.astroidData.id}</td>
                                        </tr>

                                        <tr>
                                            <th>Name</th>
                                            <td>
                                                {this.state.astroidData.name}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Orbit ID</th>
                                            <td>
                                                {
                                                    this.state.astroidData
                                                        .orbital_data.orbit_id
                                                }
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Diameter (Kms)</th>
                                            <td>
                                                {
                                                    this.state.astroidData
                                                        .estimated_diameter
                                                        .kilometers
                                                        .estimated_diameter_max
                                                }
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>First Observation Date</th>
                                            <td>
                                                {
                                                    this.state.astroidData
                                                        .orbital_data
                                                        .first_observation_date
                                                }
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Orbital Determination date</th>
                                            <td>
                                                {
                                                    this.state.astroidData
                                                        .orbital_data
                                                        .orbit_determination_date
                                                }
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Inclination</th>
                                            <td>
                                                {this.state.astroidData.orbital_data.inclination.substring(
                                                    0,
                                                    7
                                                )}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Orbital Period</th>
                                            <td>
                                                {this.state.astroidData.orbital_data.orbital_period.substring(
                                                    0,
                                                    7
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {this.AlertDismissible()}
                            </center>
                        </div>
                    )}
                </div>
            </center>
        );
    }
}
