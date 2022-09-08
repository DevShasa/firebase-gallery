import { Google } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import EmailFIeld from './inputs/EmailFIeld';
import PasswordField from './inputs/PasswordField';
import { useAuth } from '../../context/authContext';
import SubmitButton from './inputs/SubmitButton';
import ResetPassword from "./ResetPassword";

const Login = () => {

    const { modal, setModal, signUp, login, loginWithGoogle, setAlert, setLoading } = useAuth()

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const [ isRegister, setIsRegister ] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(isRegister){
            // the user is registering a new account
            const confirmPassword = confirmPasswordRef.current.value;
            try{
                if(confirmPassword!== password){throw new Error("Passwords do not match")}
                
                await signUp(email, password)
                setModal({...modal, isOpen: false})
            }catch(error){
                setAlert({
                    isAlert: true,
                    severity: "error",
                    message: error.message,
                    timeout: 5000,
                    location: "modal"
                })
            }
        }else{    
            // user is loggin in
            try{
                await login(email, password);
                setModal({...modal, isOpen:false})
            }catch(error){
                setAlert({
                    isAlert: true,
                    severity: "error",
                    message: error.message,
                    timeout: 5000,
                    location: "modal"
                })
                console.log("A LOGIN ERROR HAS OCCURED---->",error)
            }
        }
        setLoading(false);
    };

    const handleGoogleLogin = async()=>{
        try{
            await loginWithGoogle();
            setModal({...modal, isOpen:false})
        }catch(error){
            setAlert({
                isAlert: true,
                severity: "error",
                message: error.message,
                timeout: 5000,
                location: "modal"
            })
            console.log("A LOGIN ERROR HAS OCCURED---->",error)
        }
    }

    useEffect(()=>{
        if(isRegister){
            setModal({...modal, title:'Register'})
        }else{
            setModal({...modal, title:'Login'})
        }
    },[isRegister]) // eslint-disable-line

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
                        setModal({...modal, title: "Reset Password", content: <ResetPassword />})
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
                        {isRegister ? "Login" : "Register"}
                    </Button>
                </DialogActions>
                {/* log in with google one click */}
                <DialogActions sx={{ justifyContent:'center', py:'24px' }}>
                    <Button
                        startIcon={<Google />}
                        onClick = {handleGoogleLogin}
                        variant="outlined"
                    >
                        Log in with Google
                    </Button>
                </DialogActions>
            </form>
        </>
    );
};

export default Login