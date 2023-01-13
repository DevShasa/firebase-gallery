import {useRef} from 'react';
import { Fab, Input } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useAuth } from "../../context/authContext";
import Login from '../user/Login';

const Form = ({setFiles}) => {

    const { currentUser, setModal } = useAuth()
    const fileRef = useRef()
    const handleClick = () =>{
        if(!currentUser){
            setModal({
                isOpen: true,
                title:'Login',
                content: <Login />
            })
        }else{
            // trigger the input
            fileRef.current.click() 
        }
        
    }

    const handleChange = (e)=>{
        setFiles([...e.target.files])
        // reset the input to empty
        fileRef.current.value = null
    }

    return (
        <form>
            <Input 
                type="file"
                inputProps = {{multiple: true}}
                sx={{display: "none"}}
                inputRef={fileRef}
                onChange = {handleChange}
            />
            <Fab color="primary" aria-label="add" onClick={handleClick} sx={{zIndex:"1"}}>
                <Add fontSize="large"/>
            </Fab>
        </form>
    )
}

export default Form