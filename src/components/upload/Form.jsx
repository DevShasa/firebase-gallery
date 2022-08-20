import {useRef} from 'react';
import { Fab, Input } from "@mui/material";
import Add from "@mui/icons-material/Add";

const Form = () => {

    const fileRef = useRef()
    const handleClick = () =>{
        fileRef.current.click()
    }

    return (
        <form>
            <Input 
                type="file"
                multiple
                sx={{display: "none"}}
                inputRef={fileRef}
            />
            <Fab color="primary" aria-label="add" onClick={handleClick} sx={{zIndex:"1"}}>
                <Add fontSize="large"/>
            </Fab>
        </form>
    )
}

export default Form