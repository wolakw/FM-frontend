import {Link} from "react-router-dom";
import React from "react";
import {Button, Container, Paper} from "@mantine/core";
import axios from "axios";

export function Misc() {

    const Generate = async () => {
        await axios.get(`http://localhost:8081/generate`);
        alert("Games generated")
    };

    const Date = async () => {
        await axios.put(`http://localhost:8081/user/setdates`);
        alert("Dates set for all users")
    };

    const Simulate = async () => {
        await axios.put(`http://localhost:8081/games/simulate`);
        alert("Games Simulated")
    };

    const Reset = async () => {
        await axios.put(`http://localhost:8081/clubs/reset`);
        alert("Clubs reset")
    };

    return (
        <div>
            <Container size={420} my={40}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <button
                        className="btn btn-primary mx-2 mb-3"
                        onClick={() => Generate()}
                    >
                        Generate Games
                    </button>
                    <button
                        className="btn btn-primary mx-2 mb-3"
                        onClick={() => Date()}
                    >
                        Set user dates
                    </button>
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => Simulate()}
                    >
                        Simulate
                    </button>
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => Reset()}
                    >
                        Reset
                    </button>
                    <Link to={"/add-player"}>
                        <button className="btn btn-primary mx-2">Add Player</button>
                    </Link>
                </Paper>
            </Container>

        </div>
    )

}