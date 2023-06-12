import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function ViewGame() {
    const [game, setGame] = useState(null);
    const [invalidDateAttempt, setInvalidDateAttempt] = useState(false); // Dodana zmienna invalidDateAttempt
    const { id } = useParams(); // Pobranie ID meczu z parametrów URL

    useEffect(() => {
        loadGame();
    }, [id]); // Dodano gameId do zależności useEffect, aby ponownie załadować mecz po zmianie ID

    const loadGame = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/game/${id}`);
            setGame(result.data);
        } catch (error) {
            console.error("Error loading game:", error);
        }
    };


    if (!game) {
        return <div>Loading game data...</div>;
    }

    return (
        <div className="container">
            <h2>Match Details</h2>
            <div className="py-4">
                <h4>Teams:</h4>
                <p>Club 1: {game.club1.name}</p>
                <p>Club 2: {game.club2.name}</p>
                <p>Date: {game.gameDate?.substring(0, 10)}</p>
            </div>
            <div className="py-4">
                <h4>Match Statistics:</h4>
                <p>Goals Club 1: {game.goalsClub1}</p>
                <p>Goals Club 2: {game.goalsClub2}</p>
                <p>Shots Club 1: {game.shotsClub1}</p>
                <p>Shots Club 2: {game.shotsClub2}</p>
                <p>Possession Club 1: {game.possessionClub1}%</p>
                <p>Possession Club 2: {game.possessionClub2}%</p>
                <p>Passes Club 1: {game.passesClub1}</p>
                <p>Passes Club 2: {game.passesClub2}</p>
            </div>
            {invalidDateAttempt && (
                <div className="py-2 text-danger">
                    Cannot simulate game on a different date.
                </div>
            )}
            <Link to="/games" className="btn btn-primary mt-3">
                Back
            </Link>
        </div>
    );
}
