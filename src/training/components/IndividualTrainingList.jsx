import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export function IndividualTrainingList() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        const result = await axios.get("http://localhost:8081/players");
        setPlayers(result.data);
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fname</th>
                        <th scope="col">Lname</th>
                        <th scope="col">Pace</th>
                        <th scope="col">Shooting</th>
                        <th scope="col">Passing</th>
                        <th scope="col">Dribbling</th>
                        <th scope="col">Defending</th>
                        <th scope="col">Phisicallity</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player, index) => (
                        <tr>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{player.fname}</td>
                            <td>{player.lname}</td>
                            <td>{player.pace}</td>
                            <td>{player.shooting}</td>
                            <td>{player.passing}</td>
                            <td>{player.dribbling}</td>
                            <td>{player.defending}</td>
                            <td>{player.physicallity}</td>

                            <td>
                                <button className="btn btn-primary mx-2">Train</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default IndividualTrainingList;