import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { updateEmail } from 'firebase/auth';
import { useRef } from "react";
import { useAuth } from "../../../context/authContext"
import EmailField from "../inputs/EmailFIeld";
import SubmitButton from "../inputs/SubmitButton";

const ChangeEmail = () => {
    const { curentUser, setLoading, setALert, setModal, modal } = useAuth();
    const emailRef = useRef()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await updateEmail(curentUser, emailRef.current.value);
            setModal({...modal, isOpen:false}) // close the modal
            setALert({
                isAlert:true,
                severity: 'success',
                message: "Your email has been updated successfully",
                timeout: 8000,
                location:'main'
            })

        }catch(error){
            setALert({
                isAlert:true,
                severity: 'error',
                message: error.message,
                timeout: 5000,
                location:'modal'
            })
            console.log("ERROR UPDATING EMAIL ---->", error)
        }
        setLoading(false)
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>Please Enter your new email</DialogContentText>
                <EmailField {...{emailRef, defaultValue:curentUser?.email}}/>
            </DialogContent>
            <DialogActions>
                <SubmitButton />
            </DialogActions>
        </form>
    )
}

export default ChangeEmail