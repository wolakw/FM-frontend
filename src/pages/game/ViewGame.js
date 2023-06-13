import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Game.css"

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
            <div className="py-4">
                <h2>Match details</h2>
                <h3>{game.club1.name} {game.goalsClub1} - {game.goalsClub2} {game.club2.name}</h3>
                <h4>Date: {game.gameDate?.substring(0, 10)}</h4>
            </div>
            <div className="py-4">
                <h2>Match Statistics:</h2>
                <h4>Goals</h4>
                <p>{game.club1.name} {game.goalsClub1} - {game.goalsClub2} {game.club2.name}</p>
                <h4>Shots</h4>
                <p>{game.club1.name} {game.shotsClub1} - {game.shotsClub2} {game.club2.name}</p>
                <h4>Possession</h4>
                <p>{game.club1.name} {game.possessionClub1}% - {game.possessionClub2}% {game.club2.name}</p>
                <h4>Passes</h4>
                <p>{game.club1.name} {game.passesClub1} - {game.passesClub2} {game.club2.name}</p>
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
