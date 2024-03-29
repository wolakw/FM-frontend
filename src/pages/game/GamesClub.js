import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function Games() {
    const [games, setGames] = useState([]);

    const{user} = useAuth();

    useEffect(() => {
        loadGames();
    }, []);

    const loadGames = async () => {
        const result = await axios.get("http://localhost:8081/games");
        const filteredGames = result.data.filter(
            (game) => (game.club1.id === user?.club?.id || game.club2.id === user?.club?.id) && game.played
        );
        setGames(filteredGames);

    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">Team 1</th>
                        <th scope="col">Team 2</th>
                        <th scope="col">Score</th>
                        <th scope="col">View</th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.gameDate?.substring(0, 10)}</td>
                            <td>{game.club1.name}</td>
                            <td>{game.club2.name}</td>
                            <td>
                                {game.goalsClub1} - {game.goalsClub2}
                            </td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewgame/${game.id}`}
                                >
                                    View
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
