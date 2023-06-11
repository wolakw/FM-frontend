import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [buyMessage, setBuyMessage] = useState("");

    const { id } = useParams();

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        const result = await axios.get("http://localhost:8081/players");
        console.log(result.data);
        setPlayers(result.data);
    };

    const deletePlayer = async (id) => {
        await axios.delete(`http://localhost:8081/player/${id}`);
        loadPlayers();
    };

    const handleBuy = (playerId) => {
        // W tym przykładzie tylko wyświetlamy komunikat
        const player = players.find((player) => player.id === playerId);
        setBuyMessage(`Player ${player.firstName} ${player.lastName} has been bought.`);
    };

    return (
        <div className="container">
            <h2>Transfer Market</h2>
            <div className="py-4">
                {buyMessage && <div className="alert alert-success">{buyMessage}</div>}
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
                        if (player.taken === false) {
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
                                            onClick={() => handleBuy(player.id)}
                                        >
                                            Buy
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

                <Link to={"/add-player"}>
                    <button className="btn btn-primary mx-2">Add Player</button>
                </Link>
            </div>
        </div>
    );
}
