import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Clubs() {
    const [clubs, setUsers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadClubs();
    }, []);

    const loadClubs = async () => {
        const result = await axios.get("http://localhost:8081/clubs");
        setUsers(result.data);
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Budget</th>
                        <th scope="col">Points</th>
                        <th scope="col">Matches</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Losses</th>
                        <th scope="col">Draws</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clubs.map((club, index) => (
                        <tr key={index}>
                            {/*<th scope="row">{index + 1}</th>*/}
                            <td>{club.id}</td>
                            <td>{club.name}</td>
                            <td>{club.grade}</td>
                            <td>{club.budget}</td>
                            <td>{club.points}</td>
                            <td>{club.matchesPlayed}</td>
                            <td>{club.matchesWon}</td>
                            <td>{club.matchesLost}</td>
                            <td>{club.matchesDraw}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewclub/${club.id}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={`/editclub/${club.id}`}
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
