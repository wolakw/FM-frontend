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
import {api} from "../../../api/ApiServices";
import {Link, useNavigate} from "react-router-dom";

export function NewUserForm() {
    let navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            username:''

        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const submitHandle = (formValues)=>{
        newUserMutation.mutate(formValues);
        navigate("/users");
    }
    const newUserMutation = useMutation(api.newUser,{
        onSuccess:data => console.log(data)
    });
    return (
        <Container size={420} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(submitHandle)}>
                <TextInput label="Username" placeholder="Username" required {...form.getInputProps('username')} />

                <TextInput label="Name" placeholder="Name" required  {...form.getInputProps('name')}/>
                <TextInput label="Email" placeholder="mail@web.com" required {...form.getInputProps('email')}/>


                <Button type={"submit"} fullWidth mt="xl">
                    Add user
                </Button>

                <Link className={"btn btn-outline-danger"} style={{width: '100%', marginTop: 5}} to={"/users"}>
                    Cancel
                </Link>
                </form>
            </Paper>
        </Container>)

}

export default NewUserForm;