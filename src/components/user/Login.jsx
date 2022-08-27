import { Google } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import EmailFIeld from './inputs/EmailFIeld';
import PasswordField from './inputs/PasswordField';
import { useAuth } from '../../context/authContext';
import SubmitButton from './inputs/SubmitButton';

const Login = () => {

    const { modal, setModal, signUp, login, loginWithGoogle, setAlert, setLoading } = useAuth()

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [ isRegister, setIsRegister ] = useState(false)

    const handleSubmit = ()=>{

    }

    const handleGoogleLogin = ()=>{

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <DialogContentText>
                        Please enter your email and password
                    </DialogContentText>
                    <EmailFIeld {...{emailRef}}/>
                    <PasswordField {...{passwordRef, autoFocus: false}}/>
                    {isRegister &&(
                        <PasswordField {...{
                            passwordRef: confirmPasswordRef,
                            id:"ConfirmPassword",
                            label:"Confirm Password",
                            autoFocus: false
                        }}/>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent:'space-between', px:"19px" }}>
                    <Button size="small" onClick={()=>{
                        setModal({...modal, title: "Reset Password", content: "resetComponent"})
                    }}>
                        Forgot Password
                    </Button>
                    <SubmitButton />
                </DialogActions>
                {/* ask the user to register */}
                <DialogActions sx={{justifyContent:"left", p:'5px 24px'}}>
                    {isRegister
                        ? "Do you have an account? Sign in now"
                        : "Don't have an account?"
                    }
                    <Button onClick={()=>setIsRegister(!isRegister)}>
                        {isRegister ? "Register" : "Login"}
                    </Button>
                </DialogActions>
                {/* log in with google one click */}
                <DialogActions sx={{ justifyContent:'center', py:'24px' }}>
                    <Button
                        startIcon={<Google />}
                        onClick = {handleGoogleLogin}
                        variant="outlined"
                    >
                        Log in with GOogle
                    </Button>
                </DialogActions>
            </form>
        </>
    );
};

export default Login