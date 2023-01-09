import { Button, DialogActions, DialogContent, DialogContentText }  from '@mui/material';
import { useAuth } from "../../../context/authContext"
import { GoogleAuthProvider, reauthenticateWithPopup } from 'firebase/auth';
import ChangeEmail from './ChangeEmail';
import ReAuth from './ReAuth';


const AccountSettings = () => {

    const { currentUser,  setModal, modal, setAlert} = useAuth() 

    // check who is the password provider 
    const logInViaPassword = currentUser?.providerData[0].providerId === "password"

    const handleAction = async(action) =>{
        if(logInViaPassword){
            // user logs in by entering password and email
            setModal({
                ...modal,
                title: "Re-Login",
                content: <ReAuth {...{action}}/>
            })
        }else{
            // user logs in by clicking log in with google
            try{
                await reauthenticateWithPopup( currentUser, new GoogleAuthProvider()); //reAuthenticate
                switch(action){
                    case 'changeEmail':
                        setModal({ ...modal, title: "Update Email", content: <ChangeEmail />})
                        break
                        case 'deleteAccount':
                            setModal({ ...modal, title: "Delete Account", content: "Delete Account"})
                            break
                    default:
                        throw new Error("No Matching Action")
                }
            }catch(error){
                setAlert({
                    isAlert: true,
                    severity: 'error',
                    message: error.message,
                    timeout: 5000,
                    location: 'modal'
                })
                console.log("ERROR REAUTHENTICATING USER VIA GOOGLE--->", error)
            }
        }
    }

    return (
        <>
            <DialogContent dividers>
                <DialogContentText>
                    You need to provide credentials to perform any of these actions
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{flexDirection: 'column', gap: 2, my:2}}>
                {logInViaPassword && (
                    <Button onClick = {()=>handleAction('changePassword')}>Change Password</Button>
                )}
                <Button onClick = {()=>handleAction('changeEmail')}>Change Email</Button>
                <Button onClick = {()=>handleAction('deleteAccount')}>Delete Account</Button>
            </DialogActions>
        </>
    )
}

export default AccountSettings