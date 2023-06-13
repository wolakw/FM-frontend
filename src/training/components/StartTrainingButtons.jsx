import {Link} from "react-router-dom";
import React from "react";
import {Button, Container, Paper} from "@mantine/core";

export function StartTrainingButtons() {

    return (
        <div>
            <Container size={420} my={40}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <Link to={"/Individual-training"}>
                        <button className="btn btn-primary mx-2">Individual Training</button>
                    </Link>
                    <Link to={"/Team-training"}>
                        <button className="btn btn-primary mx-2">Team Training</button>
                    </Link>
                </Paper>
            </Container>

        </div>
    )

}

export default StartTrainingButtons;