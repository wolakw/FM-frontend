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
            <h2>{club.name}</h2>
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
                    {players.map((player, index) => (
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
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewplayer/${player.id}`}
                                >
                                    View
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deletePlayer(player.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Link to={"/add-player"}>
                    <button className="btn btn-primary mx-2">Add Player</button>
                </Link>
            </div>
        </div>
    );
}
