import { useEffect } from 'react';
import { Dialog, DialogTitle, IconButton }  from '@mui/material';
import { useAuth } from "../context/authContext";
import { Close } from "@mui/icons-material";
import Notify from './Notify';


const Modal = () => {
    // get data from context
    const {  modal, setModal, alert, setAlert} = useAuth()
    
    const closeModal = ()=>{
        setModal({ ...modal, isOpen: false })
    }

    useEffect(()=>{
        if(modal.isOpen === false){
            if(alert.isAlert && alert.location === "modal" ){
                setAlert({...alert, isAlert: false})
            }
        }
    },[modal?.isOpen]) // eslint-disable-line 

    return (
        <Dialog open={modal.isOpen} onClose={closeModal}>
            <DialogTitle>
                {modal.title}
                <IconButton
                    aria-label='Close'
                    onClick= {closeModal}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            {modal.content}
            {alert.location === "modal" && <Notify />}
        </Dialog>
    );
};

export default Modal;