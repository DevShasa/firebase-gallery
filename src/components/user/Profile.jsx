import { useState, useEffect } from 'react';
import { 
    Avatar, 
    Box, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    IconButton, 
    TextField, 
    Tooltip
} from '@mui/material'
import { Crop } from "@mui/icons-material";
import { useAuth } from '../../context/authContext';
import SubmitButton from "./inputs/SubmitButton";
import { v4 as uuidv4} from 'uuid';

const Profile = () => {
    const { currentUser } = useAuth()
    const [ name, setName ] = useState(currentUser?.displayName)
    const [ photoURL, setPhotoURL ] = useState(currentUser?.photoURL)
    const [ file, setFile ] = useState(null)

    const handleSubmit = () =>{

    }

    const handlechange = (e) =>{
        // change file when user clicks the input
        const file = e.target.files[0]
        if(file){
            setFile(file)
            setPhotoURL(URL.createObjectURL(file))
            // setOpenCrop(true)
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    You can update your profile by updating these fields
                </DialogContentText>

                <Box sx={{display: 'flex', alignItems: "center"}}>
                    <Tooltip title="Click to change photo">
                        <label htmlFor='profilePhoto'>
                                <input 
                                    accept = 'image/*'
                                    id="profilePhoto"
                                    type="file"
                                    style = {{
                                        display: 'none'
                                    }}
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
                        variant="standard"
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