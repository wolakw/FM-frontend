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
import {api} from "../../api/ApiServices";

export function NewUserForm() {
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
    }
    const newUserMutation = useMutation(api.newUser,{
        onSuccess:data => console.log(data)
    });
    return (
        <Container size={420} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(submitHandle)}>
                <TextInput label="Username" placeholder="you@mantine.dev" required {...form.getInputProps('username')} />

                <TextInput label="Name" placeholder="you@mantine.dev" required  {...form.getInputProps('name')}/>
                <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')}/>


                <Button type={"submit"} fullWidth mt="xl">
                    Add user
                </Button>
                </form>
            </Paper>
        </Container>)

}

export default NewUserForm;