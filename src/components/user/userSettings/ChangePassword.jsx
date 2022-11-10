import {useRef} from 'react';
import { DialogActions, DialogContent, DialogContentText} from "@mui/material";
import { updatePassword } from 'firebase/auth'
import { useAuth } from '../../../context/authContext';
import PasswordField from '../inputs/PasswordField';
import SubmitButton from '../inputs/SubmitButton';

const ChangePassword = () => {

  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) =>{
      e.preventDefault()
      setLoading(true)
      try{
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
          throw new Error('Passwords do not match')
        }

        await updatePassword(currentUser, passwordRef.current.value);
        setModal({...modal, isOpen: false})
        setAlert({
          isAlert: true,
          severity: 'success',
          message: 'Password successfuly updated',
          timeout: 8000,
          location: 'modal',
        })

      }catch(error){
        console.log("ERROR WHILE CHANGING tHE PASSWORD--->", error)
      }
      setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          Enter your new password
        </DialogContentText>
        <PasswordField {...{passwordRef}}/>
        <PasswordField 
          passwordRef={confirmPasswordRef}
          id="confirmPassword"
          label="Confirm Password"
        />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  )
}

export default ChangePassword