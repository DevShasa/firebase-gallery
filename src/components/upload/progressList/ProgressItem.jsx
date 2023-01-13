import { useEffect, useState } from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import { CircularProgresBar } from "./CircularProgresBar";
import uploadFileProgress from "../../../firebase/uploadFileProgress";
import { v4 as uuidv4 } from 'uuid';
import addDocument from "../../../firebase/addDocument";
import { useAuth } from "../../../context/authContext";
const ProgressItem = ({file}) => {

    const { setAlert, currentUser } = useAuth();
    // take an image and upload it while displaying the progress
    const [progress, setProgress] = useState(0)
    const [ imageUrl, setImageUrl ] = useState(null)
    // const currentUser = {uid: 'userId'}

    async function uploadImage(file){
        // .pop() removes the last element in the array and returns it
        // .split() divides a string into array based on inputs 
        // the last element in the array will be a jpg, png, gif etc
        const imageName = uuidv4() +'.'+file.name.split('.').pop();
        try{
            const url = await uploadFileProgress(
                file,
                `gallery/${currentUser?.uid}`,
                imageName,
                setProgress
            )
            // Create a new document with the url
            const galleryDoc = {
                imageURL: url,
                userID: currentUser?.uid || '',
                userEmail: currentUser?.email || '',
                userName: currentUser?.displayName || '',
                userPhoto: currentUser?.photoURL || ''
            }
            // imagename will become document.id
            await addDocument('gallery', galleryDoc, imageName)
            setImageUrl(null)
        }catch(error){
            setAlert({
                isAlert: true,
                severity: 'error',
                message: error.message,
                timeout: 8000,
                location: 'main'
            })
            console.log("ERROR UPLOADING IMAGE--->", error)
            setImageUrl(null)
        } 
    }

    useEffect(()=>{
        setImageUrl(URL.createObjectURL(file))
        uploadImage(file)
    },[file]) // eslint-disable-line 


    return (
        imageUrl && (
            <ImageListItem cols={1} rows={1} sx={{overflow:'hidden'}}>
                <img 
                    src={imageUrl}
                    alt="progress"
                    loading = "lazy"
                /> 

                {/* image overlay */}
                <Box sx = {backdrop}>
                    { progress < 100 
                        ? (<CircularProgresBar value={progress} />) 
                        : (<CheckCircleOutline sx={{width: 60, height:60, color:'lightGreen'}} />) }
                </Box>
            </ImageListItem>
        )
    )
}

export default ProgressItem

const backdrop ={
    position:"absolute",
    inset: 0,
    display: 'flex', alignItems :"center", justifyContent: 'center',
    background: 'rgba(0,0,0,.5)'
}