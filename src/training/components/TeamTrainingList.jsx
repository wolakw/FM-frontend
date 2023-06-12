import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Paper} from "@mantine/core";

export function TeamTrainingList() {

    const [club, setClub] = useState(null);
    const [players, setPlayers] = useState([]);
    const [message, setMessage] = useState("");

    const  id  = 1;

    useEffect(() => {
        loadClub();
    }, []);

    const loadClub = async () => {
        const result = await axios.get(`http://localhost:8081/club/${id}`);
        console.log(result.data);
        setClub(result.data);
        setPlayers(result.data.players);
    };

    let navigate = useNavigate();
    const onSubmit = async (e,type) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/clubup/${id}`);
        {
            players.map((player, index) => {
                axios.put(`http://localhost:8081/playerstat/${player.id}/` + type);
            })
        }

        navigate("/Individual-training");
    };

    return (
        <Container size={420} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={(e) => onSubmit(e,'speed')}>
                    <Button type={"submit"} fullWidth mt="xl">
                        Train Speed
                    </Button>
                </form>
                <form onSubmit={(e) => onSubmit(e,'shooting')}>
                    <Button type={"submit"} fullWidth mt="xl">
                        Train Shooting
                    </Button>
                </form>
                <form onSubmit={(e) => onSubmit(e,'passing')}>
                    <Button type={"submit"} fullWidth mt="xl">
                        Train Passing
                    </Button>
                </form>
                <form onSubmit={(e) => onSubmit(e,'defending')}>
                    <Button type={"submit"} fullWidth mt="xl">
                        Train Defending
                    </Button>
                </form>
            </Paper>
        </Container>
    )

}

export default TeamTrainingList;