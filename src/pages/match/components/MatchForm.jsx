import React, { useState } from 'react';

export function MatchForm() {
    const teams = ["Manchester United", "Liverpool", "Arsenal"];
    const [team1, setTeam1] = useState(teams[0]);
    const [team2, setTeam2] = useState(teams[1]);
    const [result, setResult] = useState("");

    function playMatch() {
        const goalsTeam1 = Math.floor(Math.random() * 6);
        const goalsTeam2 = Math.floor(Math.random() * 6);
        setResult(`Wynik meczu: ${goalsTeam1} : ${goalsTeam2}`);
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
                <br /><br />
                <button type="button" onClick={playMatch}>Zagraj mecz</button>
            </form>
            <div>{result}</div>
        </div>
    );
}

export default MatchForm;
