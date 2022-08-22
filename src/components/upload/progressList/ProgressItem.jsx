import { useEffect, useState } from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import { CircularProgresBar } from "./CircularProgresBar";

const ProgressItem = ({file}) => {
    // take an image and upload it while displaying the progress
    const [progress, setProgress] = useState(100)
    const [ imageUrl, setImageUrl ] = useState(null)


    useEffect(()=>{
        setImageUrl(URL.createObjectURL(file))
        console.log(file)
    },[file])

    return (
        <ImageListItem cols={1} rows={1} sx={{overflow:'hidden'}}>
            <img 
                src={imageUrl}
                alt="progress"
                loading = "lazy"
            /> 
            <Box sx = {backdrop}>
                { progress < 100 
                    ? (<CircularProgresBar value={progress} />) 
                    : (<CheckCircleOutline sx={{width: 60, height:60, color:'lightGreen'}} />) }
            </Box>

        </ImageListItem>
    )
}

export default ProgressItem

const backdrop ={
    position:"absolute",
    inset: 0,
    display: 'flex', alignItems :"center", justifyContent: 'center',
    background: 'rgba(0,0,0,.5)'
}