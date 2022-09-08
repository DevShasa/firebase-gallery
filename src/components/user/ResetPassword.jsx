import { useRef } from 'react';
import {  DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useAuth } from '../../context/authContext';
import EmailFIeld from "./inputs/EmailFIeld";
import SubmitButton from './inputs/SubmitButton';

const ResetPassword = () => {
    const { setLoading, setAlert, setModal, modal, resetPassword, } = useAuth()
    
    const emailRef = useRef()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await resetPassword(emailRef.current.value);
            setModal({...modal, isOpen: false}) // close the modal
            // Create an alert
            setAlert({  
                isAlert: true,
                severity: "success",
                message: "Reset link has been sent to your email",
                timeout: 8000,
                location: 'main'
            })
        }catch(error){
            setAlert({
                isAlert: true,
                severity: "error",
                message: error.message,
                timeout: 5000, // 8 seconds
                location: "modal"

            })
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>Please enter your email to reset password</DialogContentText>
                <EmailFIeld emailRef={emailRef} />
            </DialogContent>
            <DialogActions>
                <SubmitButton />
            </DialogActions>
        </form>
    )
}

export default ResetPassword