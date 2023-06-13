import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [buyMessage, setBuyMessage] = useState("");

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        
        const result = await axios.get("http://localhost:8081/players");
        console.log(result.data);
        setPlayers(result.data);
    };

    const handleBuy = (playerId) => {
        const player = players.find((player) => player?.id === playerId);
        if (player?.price > user?.club?.budget) {
            setBuyMessage("Not enough budget to buy this player.");
        } else {
            buyPlayer(playerId);
        }
    };


    const buyPlayer = async (Ids) => {
        try {
            await axios.put(`http://localhost:8081/players/${Ids}/buy`);
            setBuyMessage("Player has been bought.");
            loadPlayers();
            loadUser();
        } catch (error) {
            console.log(error);
            setBuyMessage("Not enough budget to buy this player.");
        }
    };

    const{user} = useAuth();
    const id = user?.id;

    const [u, setUser] = useState({
        name:"",
        username:"",
        email:"",
        club:"",
        currDate:""
    })

    useEffect(()=> {
        loadUser();
    }, [])

    const loadUser = async ()=>{
        const result = await  axios.get(`http://localhost:8081/user/${id}`);
        setUser(result.data);
    }

    return (
        <div className="container">
            <h2>Transfer Market | Your budget {u?.club.budget?.toLocaleString()}$</h2>
            <div className="py-4">
                {buyMessage && <div className="alert alert-success">{buyMessage}</div>}
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
                    {players.map((player, index) => {
                        if (player.taken === false) {
                            return (
                                <tr key={index}>
                                    <td>{player.id}</td>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.speed}</td>
                                    <td>{player.shooting}</td>
                                    <td>{player.defending}</td>
                                    <td>{player.passing}</td>
                                    <td>{player?.price?.toLocaleString()}$</td>
                                    <td>
                                        <button
                                            className="btn btn-primary mx-2"
                                            onClick={() => handleBuy([player.id, id])}
                                        >
                                            Buy
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null; // Ignoruj zawodników, których atrybut isTaken === true
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
