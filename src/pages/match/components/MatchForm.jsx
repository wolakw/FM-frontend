import React, { useState } from 'react';

function Match() {
    const teams = ["Manchester United", "Liverpool", "Arsenal"];
    const [team1, setTeam1] = useState(teams[0]);
    const [team2, setTeam2] = useState(teams[1]);
    const [result, setResult] = useState("");
    const [scorers, setScorers] = useState([]);
    const [possession, setPossession] = useState("");
    const [passes, setPasses] = useState("");
    const [shots, setShots] = useState("");

    function playMatch() {
        const goalsTeam1 = Math.floor(Math.random() * 6);
        const goalsTeam2 = Math.floor(Math.random() * 6);
        setResult(`Wynik meczu: ${team1} ${goalsTeam1} : ${goalsTeam2} ${team2}`);
        setScorers(generateScorers(goalsTeam1, goalsTeam2));
        setPossession(generatePossession());
        setPasses(generatePasses());
        setShots(generateShots());
    }

    function generateScorers(goalsTeam1, goalsTeam2) {
        const scorers = [];
        for (let i = 0; i < goalsTeam1; i++) {
            scorers.push({
                team: team1,
                player: `${team1} scorer ${i + 1}`
            });
        }
        for (let i = 0; i < goalsTeam2; i++) {
            scorers.push({
                team: team2,
                player: `${team2} scorer ${i + 1}`
            });
        }
        return scorers;
    }

    function generatePossession() {
        const possesion = Math.floor(Math.random() * 61) + 40;
        return `${team1} ${possesion}% - ${team2} ${100-possesion}%`;
    }

    function generatePasses() {
        return `${team1} ${Math.floor(Math.random() * 300) + 100} - ${team2} ${Math.floor(Math.random() * 300) + 100}`;
    }

    function generateShots() {
        return `${team1} ${Math.floor(Math.random() * 15)} - ${team2} ${Math.floor(Math.random() * 15)}`;
    }

    function handleTeam1Change(event) {
        setTeam1(event.target.value);
    }

    function handleTeam2Change(event) {
        setTeam2(event.target.value);
    }

    return (
        <div>
            <h1>Wybierz drużyny i zagraj mecz</h1>
            <p>Wybierz dwie drużyny i kliknij przycisk, aby zagrać mecz.</p>
            <form>
                <label htmlFor="team1">Drużyna 1:</label>
                <select id="team1" name="team1" value={team1} onChange={handleTeam1Change}>
                    {teams.map((team) => (
                        <option key={team} value={team}>{team}</option>
                    ))}
                </select>
                <label htmlFor="team2">Drużyna 2:</label>
                <select id="team2" name="team2" value={team2} onChange={handleTeam2Change}>
                    {teams.map((team) => (
                        <option key={team} value={team}>{team}</option>
                    ))}
                </select>
            </form>
            <button onClick={playMatch}>Rozegraj mecz</button>
            <p>{result}</p>
            <ul>
                {scorers.map((scorer) => (
                    <li key={scorer.player}>{scorer.team} - {scorer.player}</li>
                ))}
            </ul>
            <p>Posiadanie piłki: {possession}</p>
            <p>Liczba podań: {passes}</p>
            <p>Liczba strzałów: {shots}</p>
        </div>
    );
}

export default Match;
