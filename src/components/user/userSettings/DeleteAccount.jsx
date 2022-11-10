import { Send } from "@mui/icons-material";
import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { deleteUser } from "firebase/auth";
import { useAuth } from "../../../context/authContext";
import deleteUserFiles from "../../../firebase/deleteUserFiles";

const DeleteAccount = () => {

    const { currentUser, setLoading, setAlert, setModal} = useAuth()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await deleteUserFiles('gallery', currentUser) // deletes user files
            await deleteUser(currentUser) // deletes user
            setModal({isOpen: false, title:'', content:''})
            setAlert({
                isAlert: true,
                severity: 'info',
                message: "Account deleted",
                timeout: 8000,
                location: 'main',
            })
        }catch(error){
            setAlert({
                isAlert: true,
                severity: 'error',
                message: error.message,
                timeout: 5000,
                location: 'modal',
            })
            console.log("UNABLE TO DELETE ACCOUNT--->", error)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete your account
                    deleting your account will also delete all your files
                </DialogContentText>
                <DialogActions>
                    <Button type="submit" endIcon={<Send />} variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </DialogContent>
        </form>
    )
}

export default DeleteAccount