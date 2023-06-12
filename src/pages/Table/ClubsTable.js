import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Clubs() {
    const [clubs, setClubs] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadClubs();
    }, []);

    const loadClubs = async () => {
        const result = await axios.get("http://localhost:8081/clubs");
        setClubs(result.data);
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Matches Played</th>
                        <th scope="col">Matches Won</th>
                        <th scope="col">Matches Draw</th>
                        <th scope="col">Matches Lost</th>
                        <th scope="col">Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clubs.map((club, index) => (
                        <tr key={index}>
                            <td>{club.id}</td>
                            <td>{club.name}</td>
                            <td>{club.matchesPlayed}</td>
                            <td>{club.matchesWon}</td>
                            <td>{club.matchesDraw}</td>
                            <td>{club.matchesLost}</td>
                            <td>{club.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
