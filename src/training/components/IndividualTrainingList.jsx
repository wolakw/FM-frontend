import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";

export function IndividualTrainingList() {

    const [club, setClub] = useState(null);
    const [players, setPlayers] = useState([]);
    const [message, setMessage] = useState("");

    const{user} = useAuth();
    const  id  = user?.club.id;
    const  uid  = user?.id;

    useEffect(() => {
        loadClub();
    }, []);

    const loadClub = async () => {
        const result = await axios.get(`http://localhost:8081/club/${id}`);
        console.log(result.data);
        setClub(result.data);
        setPlayers(result.data.players);
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
                        <th scope="col">Speed</th>
                        <th scope="col">Shooting</th>
                        <th scope="col">Passing</th>
                        <th scope="col">Defending</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((player, index) => (
                        <tr>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{player.firstName}</td>
                            <td>{player.lastName}</td>
                            <td>{player.speed}</td>
                            <td>{player.shooting}</td>
                            <td>{player.passing}</td>
                            <td>{player.defending}</td>

                            <td>
                                <Link className="btn btn-primary mx-2" to={`/individual-training/${player.id}`}>Train</Link>
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