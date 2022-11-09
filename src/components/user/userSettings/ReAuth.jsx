import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import {EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth';
import { useRef } from 'react';
import { useAuth } from "../../../context/authContext";
import PasswordField from "../inputs/PasswordField";
import SubmitButton from "../inputs/SubmitButton";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const ReAuth = ({action}) => {
    const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();
    const passwordRef = useRef();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true)
        const credential  = EmailAuthProvider.credential(
            // generate a credential to check later
            currentUser?.email,
            passwordRef.current.value
        );

        try{
            await reauthenticateWithCredential(currentUser, credential);
            
            // redirect the user to the right modal after reauthenticating
            switch(action){
                case 'changePassword':
                    setModal({...modal, title:"Update Password", content: <ChangePassword />});
                    break;
                case 'changeEmail':
                    setModal({...modal, title:"Update Email", content: <ChangeEmail/>});
                    break;
                case 'deleteAccount':
                    setModal({...modal, title:"Delete Account", content: <DeleteAccount/>});
                    break;             
                default:
                    throw new Error("No matching Action")
            }

        }catch(error){
            setAlert({
                isAlert: true,
                severity: 'error',
                message: error.message,
                timeout: 5000,
                location:'modal',
            });
            console.log(error)
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>Please enter your current password</DialogContentText>
                <PasswordField {...{passwordRef}}/>
                <DialogActions><SubmitButton/></DialogActions>
            </DialogContent>
        </form>
    )
}

export default ReAuth