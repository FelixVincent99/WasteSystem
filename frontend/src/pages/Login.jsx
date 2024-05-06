import React from 'react'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isError, isLoading, isSuccess, message} = useSelector(state => state.auth);

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/area/list')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        console.log("abc");
        e.preventDefault();
        const userData = {
            email,
            password
        }

        dispatch(login(userData));
    }

    if(isLoading){
        return <Spinner />
    }

    //ui
    const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <h1>
                Sign in
            </h1>
                <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField id="email" label="Email Address" name="email"  margin="normal" value={email} onChange={onChange} autoComplete="email" autoFocus required fullWidth />
                    <TextField id="password" label="Password" name="password" type="password" value={password} onChange={onChange} margin="normal" autoComplete="current-password" required fullWidth/>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  )
}

export default Login
