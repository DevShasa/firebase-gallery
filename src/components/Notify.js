/**
 * Display an alert when alert parameter is true
 */

import { useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext;'
import Close from "@mui/icons-material/Close";
import { Alert, Box, Collapse, IconButton } from "@mui/material";

const Notify = () => {

    const { alert, setAlert } = useAuth()
    const alertRef = useRef()

    useEffect(()=>{
        // Ensure smooth scroling behaviour when component is mounted
        alertRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        })

        let timer;
        if(alert.timeout){
            timer = setTimeout(()=>{
                setAlert({...alert, isAlert: false})
            }, alert.timeout)
        }

        return clearTimeout(timer)
        
    },[alert.timeout]) // eslint-disable-line 

    return (
        <Box sx={{mb: 2}} ref={alertRef}>
            <Collapse in={alert.isAlert}>
                <Alert
                    severity ={alert.severity}
                    action={
                        <IconButton
                            aria-label="Close"
                            size="small"
                            onClick={()=>setAlert({...alert, isAlert:false})}
                        >
                            <Close fontSize="small"/>
                        </IconButton> 
                    }
                >
                    {alert.message}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default Notify