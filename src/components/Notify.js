import { useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext;'
import Close from "@mui/icons-material/Close";
import { Alert, Box, Collapse, IconButton } from "@mui/material";

const Notify = () => {

    const { alert, setAlert } = useAuth()
    const alertRef = useRef()

    useEffect(()=>{
        // Ensure smooth scrooling behaviour when component is mounted
        alertRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        })

        
    },[])

    return (
        <div>Notify</div>
    )
}

export default Notify