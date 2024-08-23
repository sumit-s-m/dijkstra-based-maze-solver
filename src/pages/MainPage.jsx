//Library Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

//React Datepicker CSS
import "react-datepicker/dist/react-datepicker.css";

function MainPage() {
    const [searchAsteroid, setSearchAsteroid] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    //Reference for the search asteroid input field
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {}, 3000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchAsteroid]);

    //Format date from react-datepicker into YYYY-MM-DD format
    function formatDate(date) {
        const preformattedDate = new Date(date);

        const day = preformattedDate.getDate();
        const month = preformattedDate.getMonth() + 1;

        const year = preformattedDate.getFullYear();

        const formattedDate = year + "-" + month + "-" + day;

        return formattedDate;
    }

    //UI for Main Page
    return (
        <div className="mt-4 mb-4">
            <center>
                <div className="title-section mt-2">
                    <h1 className="title">NEOWS</h1>
                </div>
            </center>

            <p className="discription-text ml-4 mr-4 mt-4 mb-4">
                <strong>NeoWs</strong> (Near Earth Object Web Service) is a
                RESTful web service for near earth Asteroid information. All the
                data is from the NASA JPL Asteroid team. JPL manages NASA's
                Center for Near-Earth Object Studies, which tracks comets and
                asteroids that drift close to Earth's orbital neighborhood.
            </p>

            <p className="discription-text ml-4 mr-4 mb-4">
                A Near-Earth Object (NEO) is generally defined as an asteroid or
                comet that approaches our planet less than 1.3 times the
                distance from Earth to the Sun (the Earth-Sun distance is about
                93 million miles). Most NEOs pose no peril at all. It’s the
                small percentage of Potentially Hazardous Asteroids that draws
                extra scrutiny. These objects are defined as those that approach
                Earth at less than half the Earth-Sun distance.
            </p>

            <div className="content-tab-1 mt-3">
                <h2 className="text-center">Neo - Feed</h2>

                <center>
                    <p className="border-bottom w-50"></p>
                </center>

                <p className="neo-feed-text ml-4 mr-4">
                    Neo-Feed is a RESTful web service for near earth Asteroid
                    information. With NeoWs a user can search for Asteroids
                    based on their closest approach date to Earth. It takes two
                    arguments the start date and an end date in the format
                    YYYY-MM-DD. The max range of the query is 7 days not
                    including the start date. The query returns data of
                    asteroids by their approach date to earth within the given
                    range of dates.
                </p>

                <label>Pick Start Date:</label>

                {/* React Datepicker element for start date */}
                <DatePicker
                    className="date-picker mb-2 "
                    data-bs-toggle="popover"
                    data-bs-trigger="focus"
                    title="Select Start Date"
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    startDate={startDate}
                    selectsStart
                    showMonthDropdown
                    showYearDropdown
                    endDate={endDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Select Start Date"
                    withPortal
                />

                <label>Pick End Date:</label>

                {/* React Datepicker element for end date */}
                <DatePicker
                    className="date-picker"
                    data-bs-toggle="popover"
                    data-bs-trigger="focus"
                    title="Select End Date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="yyyy-MM-dd"
                    minDate={startDate}
                    maxDate={addDays(startDate, 7)}
                    placeholderText="Select Start Date"
                    withPortal
                />

                <Link
                    to={`/search-asteroid-dates/${formatDate(
                        startDate
                    )}&${formatDate(endDate)}`}>
                    <button
                        type="button"
                        className="btn btn-success btn-sm mt-2">
                        {" "}
                        Search{" "}
                    </button>
                </Link>
            </div>

            <div className="content-tab-2 mt-4">
                <h2>Neo - Lookup</h2>
                <center>
                    <p className="border-bottom w-50"></p>
                </center>
                <p className="neo-lookup-text ml-4 mr-4">
                    Neo-Lookup is a RESTful web service for near earth Asteroid
                    information. With NeoWs a user can search for an Asteroid
                    using the NASA JPL small body (SPK-ID) ID. The query returns
                    data on the asteroid whose SPK-ID is provided.
                </p>
                <label>Enter Asteroid Id:</label> <br></br>
                <input
                    className="asteroid-id-text mt-1 mr-2"
                    id="asteroid"
                    data-bs-toggle="popover"
                    data-bs-trigger="focus"
                    title="Enter Asteroid Id"
                    onChange={(e) => setSearchAsteroid(e.target.value)}
                    type="text"
                    placeholder="Asteroid Id"
                />
                <br></br>
                <Link
                    to={`/search-asteroid-id/${searchAsteroid}`}
                    className="btn btn-success btn-sm mt-2 mb-2">
                    Search
                </Link>
            </div>
        </div>
    );
}

export default MainPage;
