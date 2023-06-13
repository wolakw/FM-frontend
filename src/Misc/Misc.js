import {Link} from "react-router-dom";
import React from "react";
import {Button, Container, Paper} from "@mantine/core";
import axios from "axios";

export function Misc() {


    const Simulate = async () => {
        await axios.put(`http://localhost:8081/games/simulate`);
        alert("Games Simulated.")
    };

    const Reset = async () => {
        await axios.put(`http://localhost:8081/clubs/reset`);
        alert("Clubs Reset.")
    };

    return (
        <div>
            <Container size={420} my={40}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <button
                        className="btn btn-danger mx-2"
                        onClick={() => Simulate()}
                    >
                        Simulate
                    </button>
                    <button
                        className="btn btn-danger mx-2"
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