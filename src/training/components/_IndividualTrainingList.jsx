import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {api} from "../../api/ApiServices";
import {Button, Container, Paper, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

export function _IndividualTrainingList() {

    let navigate = useNavigate();

    const { id } = useParams();
    const onSubmit = async (e,type) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/playerstat/${id}/`+type);
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

export default _IndividualTrainingList;