import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreVert from '@mui/icons-material/MoreVert';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import deleteFile from '../../firebase/deleteStoredFile';
import deleteDocument from '../../firebase/deleteDocument';
import { useAuth } from "../../context/authContext";

export default function Options({imageId, imageURL, userId}) {
    const { currentUser, setAlert } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { 
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async ()=>{
        try{
            await deleteDocument('gallery', imageId);
            await deleteFile(`gallery/${currentUser.uid}/${imageId}`)
        }catch(error){
            setAlert({
                isAlert: true,
                severity: 'error',
                message: error.message,
                timeout: 8000,
                location: 'main'
            })
        }
    }

    const handleDownload = async() =>{
        try{
			const response = await fetch(imageURL);
			const data = await response.blob(); // get the blob which is the image object 
			const blob = URL.createObjectURL(data); // create a url for the blob
			const link = document.createElement("a");
			link.href = blob;
			link.download = imageId; // name of downloaded file
			link.click(); // initiate the download
			URL.revokeObjectURL(blob); // clear from memory
			link.remove();

		}catch(error){
			setAlert({
				isAlert: true,
				severity: error,
				message: error.message,
				timeout: 8000,
				location: "main",
			})
			console.log("ERROR DOWNLOADING IMAGE", error)
		}
    }
    return (
		<React.Fragment>
			<Tooltip title="Options">
				<IconButton
					onClick={handleClick}
					sx={{
						position: "absolute",
						top: 0,
						right: 0,
						color: "white",
						background: "rgba(0,0,0,.3)",
					}}
					aria-controls={open ? "account-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
				>
					<MoreVert fontSize="large" />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
                <MenuItem onClick={handleDownload}>
                    <ListItemIcon>
                        <Download /> Download
                    </ListItemIcon>
                </MenuItem>
                {currentUser?.uid === userId && (
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <Delete /> Delete
                        </ListItemIcon>
                    </MenuItem>
                )}
			</Menu>
		</React.Fragment>
	);
}
