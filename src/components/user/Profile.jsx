import { useState } from 'react';
import { 
    Avatar, 
    Box, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    Tooltip
} from '@mui/material'
import { useAuth } from '../../context/authContext';
import SubmitButton from "./inputs/SubmitButton";
import { v4 as uuidv4} from 'uuid';
import uploadFile from '../../firebase/uploadFile';
import { updateProfile } from 'firebase/auth';
import deleteFile from '../../firebase/deleteStoredFile';
import updateUserRecords from '../../firebase/updateUserRecods';

const Profile = () => {
    const { currentUser,  setLoading, setAlert} = useAuth()
    const [ name, setName ] = useState(currentUser?.displayName)
    const [ photoURL, setPhotoURL ] = useState(currentUser?.photoURL)
    const [ file, setFile ] = useState(null)

    const handleSubmit = async (e) =>{
        // submit details to backend
        e.preventDefault()
        setLoading(true)

        let userObject = { displayName: name } // for updating user details 
        let galleryImageUpdateObject = { userName: name } // for updating the images uploaded by user with new details

        try{
            if(file){
                const imageName = uuidv4() + "." +file?.name?.split(".").pop();
                const url = await uploadFile(file, `profile/${currentUser?.uid}/${imageName}`)
                
                // delete previous profile image of the user before setting the new url
                if(currentUser?.photoURL){
                    const previousImage = currentUser?.photoURL?.split(`${currentUser?.uid}%2F`)[1].split("?")[0]
                    if(previousImage){
                        try{
                            await deleteFile(`profile/${currentUser?.uid}/${previousImage}`)
                        }catch(error){
                            console.log("ERROR WHEN DELETING PREVIOUS IMAGE--->", error)
                        }
                    }
                }
                
                // add the new url to displayname, if no image then only name will be in object
                userObject = {...userObject, photoURL: url}
                galleryImageUpdateObject ={ ...galleryImageUpdateObject, userPhoto: url}
            }
            
            // update with new profile image
            await updateProfile(currentUser, userObject)
            
            //update gallery image documents that are associated with this user
            // TODO use firebase functions istead of doing this client side
            updateUserRecords('gallery', currentUser?.uid, galleryImageUpdateObject)

            setAlert({
                isAlert: true,
                severity:"success",
                message: "Your profile has been updated",
                timeout: 3000,
                location: "modal"
            })
        }catch(error){
            setAlert({
                isAlert: true,
                severity:"error",
                message: error.message,
                timeout: 5000,
                location: "modal"
            })
            console.log("ERROR UPDATING USER DETAILS----->",error)
        }

        setLoading(false)
    }

    const handlechange = (e) =>{
        // change file when user clicks the input
        const profilePhoto = e.target.files[0]
        if(profilePhoto){
            setFile(profilePhoto)
            setPhotoURL(URL.createObjectURL(profilePhoto))
            // setOpenCrop(true)
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <DialogContent dividers>
                <DialogContentText sx={{marginBottom: "10px"}}>
                    You can update your profile by updating these fields
                </DialogContentText>

                <Box sx={{display: 'flex', alignItems: "center"}}>
                    <Tooltip title="Click to change photo">
                        <label htmlFor='profilePhoto'>
                                <input id="profilePhoto"
                                    accept = 'image/*'
                                    type="file"
                                    style = {{display: 'none'}}
                                    onChange = {handlechange}
                                />
                                <Avatar src={photoURL} sx={{width: 75, height: 75, cursor:'pointer'}}/>
                        </label>
                    </Tooltip>
                    {/* crop button and functionality here */}
                    <TextField 
                        autoFocus
                        margin="normal"
                        type="text"
                        inputProps={{
                            // this applies to the underlying input element
                            minLength: 2
                        }}
                        fullWidth
                        variant="outlined"
                        value={name || ""}
                        onChange = {(e)=> setName(e.target.value)}
                        label="Name"
                        required
                        sx={{
                            marginLeft: '5px'
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <SubmitButton />
            </DialogActions>
        </form>
    )
}

export default Profile