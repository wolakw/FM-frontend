import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function ClubPlayers() {
    const [club, setClub] = useState(null);
    const [players, setPlayers] = useState([]);
    const [message, setMessage] = useState("");

    const{user} = useAuth();
    const  id  = user?.club.id;
    const  uid  = user?.id;

    useEffect(() => {
        loadClub();
    }, []);

    const loadClub = async () => {
        const result = await axios.get(`http://localhost:8081/club/${id}`);
        console.log(result.data);
        setClub(result.data);
        setPlayers(result.data.players);
    };

    const movePlayerToXI = async (playerId) => {
        const updatedPlayers = players.map((player) => {
            if (player.id === playerId) {
                player.firstXI = true;
            }
            return player;
        });

        const countFirstXI = updatedPlayers.filter((player) => player.firstXI === true).length;
        if (countFirstXI <= 11) {
            await axios.put(`http://localhost:8081/player/${playerId}/moveToXI`);
            setPlayers(updatedPlayers);
            setMessage("Player moved to XI successfully.");
        } else {
            setMessage("You already have 11 players in the First XI.");
            loadClub();
        }
    };

    const removePlayerFromXI = async (playerId) => {
        await axios.put(`http://localhost:8081/players/${playerId}/remove-from-xi`);
        loadClub();
        setMessage("Player has been removed from the first XI.");
    };

    const sellPlayer = async (Ids) => {
        await axios.put(`http://localhost:8081/players/${Ids}/sell`);
        loadClub();
        setMessage("Player has been sold");
    };

    if (!club) {
        return <div>Loading club data...</div>;
    }

    return (
        <div className="container">
            <h2>First XI of {club.name} | Your team's rating is {club.grade}/100</h2>

            <div className="py-4">
                {message && <div className="alert alert-success">{message}</div>}
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
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
                                    <td>{index + 1}</td>
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
                                            onClick={() => removePlayerFromXI(player.id)}
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
                                            onClick={() => movePlayerToXI(player.id)}
                                        >
                                            Move to XI
                                        </button>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => sellPlayer([player.id, uid])}
                                        >
                                            Sell player
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
