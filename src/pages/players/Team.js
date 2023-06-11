import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ClubPlayers() {
    const [club, setClub] = useState(null);
    const [players, setPlayers] = useState([]);

    const  id  = 1;

    useEffect(() => {
        loadClub();
    }, []);

    const loadClub = async () => {
        const result = await axios.get(`http://localhost:8081/club/${id}`);
        console.log(result.data);
        setClub(result.data);
        setPlayers(result.data.players);
    };

    const deletePlayer = async (id) => {
        await axios.delete(`http://localhost:8081/player/${id}`);
        loadClub();
    };

    if (!club) {
        return <div>Loading club data...</div>;
    }

    return (
        <div className="container">
            <h2>First XI of {club.name}</h2>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Speed</th>
                        <th scope="col">Shooting</th>
                        <th scope="col">Defending</th>
                        <th scope="col">Passing</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player, index) => {
                        if (player.firstXI === true) {
                            return (
                                <tr key={index}>
                                    <td>{player.id}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.speed}</td>
                                    <td>{player.shooting}</td>
                                    <td>{player.defending}</td>
                                    <td>{player.passing}</td>
                                    <td>{player.price.toLocaleString()}$</td>
                                    <td>
                                        <button
                                            className="btn btn-primary mx-2"

                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null; // Ignoruj zawodników, których atrybut isTaken === true
                        }
                    })}
                    </tbody>
                </table>
            </div>

            <h2>Substitutions</h2>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Speed</th>
                        <th scope="col">Shooting</th>
                        <th scope="col">Defending</th>
                        <th scope="col">Passing</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player, index) => {
                        if (player.firstXI === false) {
                            return (
                                <tr key={index}>
                                    <td>{player.id}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.speed}</td>
                                    <td>{player.shooting}</td>
                                    <td>{player.defending}</td>
                                    <td>{player.passing}</td>
                                    <td>{player.price.toLocaleString()}$</td>
                                    <td>
                                        <button
                                            className="btn btn-primary mx-2"

                                        >
                                            Move to XI
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null; // Ignoruj zawodników, których atrybut isTaken === true
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
