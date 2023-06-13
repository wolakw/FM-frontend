import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
export default function ViewClub() {

    const [club, setClub] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadClub();
    }, []);

    const loadClub = async () => {
        const result = await axios.get(`http://localhost:8081/club/${id}`);
        setClub(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">User details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of Club with id: {club.id}:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Club Name: </b>
                                    {club.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Club Grade: </b>
                                    {club.grade}
                                </li>
                                <li className="list-group-item">
                                    <b>Club Budget: </b>
                                    {club.budget}
                                </li>
                                <li className="list-group-item">
                                    <b>Club Points: </b>
                                    {club.points}
                                </li>
                                <li className="list-group-item">
                                    <b>Matches Played: </b>
                                    {club.matchesPlayed}
                                </li>
                                <li className="list-group-item">
                                    <b>Matches Won: </b>
                                    {club.matchesWon}
                                </li>
                                <li className="list-group-item">
                                    <b>Matches Lost: </b>
                                    {club.matchesLost}
                                </li>
                                <li className="list-group-item">
                                    <b>Matches Drawn: </b>
                                    {club.matchesDraw}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/clubs"}>Back</Link>
                </div>
            </div>
        </div>
    );
}