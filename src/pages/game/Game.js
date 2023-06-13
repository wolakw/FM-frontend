import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function GameDetails() {
    const [game, setGame] = useState(null);
    const [invalidDateAttempt, setInvalidDateAttempt] = useState(false); // Dodana zmienna invalidDateAttempt
    const { id } = useParams(); // Pobranie ID meczu z parametrów URL

    const{user} = useAuth();

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

    const simulateGame = async () => {
        if (!game.played && game.gameDate === user?.currDate) {
            // Sprawdzenie czy gra jeszcze nie została zasymulowana i czy data jest dzisiejsza
            try {
                await axios.put(`http://localhost:8081/game/${id}/simulate`);
                await axios.put(`http://localhost:8081/user/${user?.id}/setdate`);
                loadGame();
            } catch (error) {
                console.error("Error simulating game:", error);
            }
        } else {
            setInvalidDateAttempt(true); // Ustawienie invalidDateAttempt na true, jeśli próba zasymulowania gry w złym dniu
        }
    };

    const isToday = (date) => {
        const today = new Date(user?.currDate);
        const gameDate = new Date(date);
        return (
            today.getFullYear() === gameDate.getFullYear() &&
            today.getMonth() === gameDate.getMonth() &&
            today.getDate() === gameDate.getDate()
        );
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
            <button
                className="btn btn-primary"
                onClick={simulateGame}
                disabled={game.played || !isToday(game.gameDate)}
            >
                {game.played ? "Game Simulated" : "Simulate Game"}
            </button>
            <Link to="/" className="btn btn-primary mt-3">
                Back
            </Link>
        </div>
    );
}
