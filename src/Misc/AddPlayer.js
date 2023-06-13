import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import {useForm} from "@mantine/form";
import {useMutation} from "@tanstack/react-query";
import {api} from "../api/ApiServices";
import {Link, useNavigate} from "react-router-dom";

export function AddPlayer() {
    let navigate = useNavigate();

    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            _f: '0',
            _t: '0',
            defending: '0',
            passing: '0',
            shooting: '0',
            speed: '0',
            club_id: '-1',
        },
    });
    const submitHandle = (formValues)=>{
        newUserMutation.mutate(formValues);
        navigate("/");
    }
    const newUserMutation = useMutation(api.newPlayer,{
        onSuccess:data => console.log(data)
    });
    return (
        <Container size={420} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(submitHandle)}>
                    <TextInput label="First Name" placeholder="First Name" required {...form.getInputProps('firstName')} />
                    <TextInput label="Last Name" placeholder="Last Name" required  {...form.getInputProps('lastName')}/>
                    <Button type={"submit"} fullWidth mt="xl">
                        Add Player
                    </Button>

                    <Link className={"btn btn-outline-danger"} style={{width: '100%', marginTop: 5}} to={"/"}>
                        Cancel
                    </Link>
                </form>
            </Paper>
        </Container>)

}