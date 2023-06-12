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
import {useAuth} from "../../../context/AuthContext";
import data from "bootstrap/js/src/dom/data";
import {useNavigate} from "react-router-dom";

export function LoginForm() {
    const navigate = useNavigate();
    const {login}=useAuth();
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        }


    });
    const loginMutation = useMutation(api.login,{
        onSuccess:(e)=>{login(e.data.token);
            navigate("/");
        }
    })
    const handleSubmit = data=>{
        loginMutation.mutate(data)
    }
    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput {...form.getInputProps('email')} label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput {...form.getInputProps('password')} label="Password" placeholder="Your password" required mt="md" />
                <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button loading={loginMutation.isLoading} type={"submit"} fullWidth mt="xl">
                    Sign in
                </Button>
                </form>
            </Paper>
        </Container>)

}

export default LoginForm;