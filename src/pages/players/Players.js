import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Players() {
    const [players, setPlayers] = useState([]);

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

    return (
        <div className="container">
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
                        {/*<th scope="col">Club</th>*/}
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player, index) => {
                        if (player.taken === false) {
                            return (
                                <tr key={index}>
                                    {/*<th scope="row">{index + 1}</th>*/}
                                    <td>{player.id}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.speed}</td>
                                    <td>{player.shooting}</td>
                                    <td>{player.defending}</td>
                                    <td>{player.passing}</td>
                                    <td>{player.price.toLocaleString()}$</td>
                                    {/*<td>{player.club?.name}</td>*/}
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewplayer/${player.id}`}
                                        >
                                            Buy
                                        </Link>
                                    </td>
                                </tr>
                            );
                        }
                        else {
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
