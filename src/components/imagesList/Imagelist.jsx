import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
//import TestProfile from "../../img/profile.jpg";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import Options from './Options';
import useFirestore from '../../firebase/useFirestore';

function srcset(image, size, rows = 1, cols = 1) {
    // if an image takes two rows and two colums, multiply this by size to give correct size
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
        size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function QuiltedImageList() {

    const { documents } = useFirestore("gallery")
    const [ isOpen, setIsOpen ] = React.useState(false)
    const [ photoIndex, setPhotoIndex ] = React.useState(0)

    // fix an issue where lightbox does not show first image...
    // however when zoom button is clicked the image shows 
    // so when user clicks on an image wait two seconds then automaticaly click the zoom button
    // to prevent zooming other images we use a flag toZoom, to make sure zoom only activated on first image
    const [toZoom, setToZoom] = React.useState(false)
    if(isOpen && !toZoom){
        const zoom = document.getElementsByClassName("ril-zoom-in")
        setTimeout(()=>{
            zoom[0].click()
            setToZoom(true)
        }, 2000)
    }

    return (
        <>
            <ImageList variant="quilted" cols={4} rowHeight={200} sx={{mt:"1rem"}}>
                {documents.map((item, index) => (
                    <ImageListItem 
                        key={item?.id} 
                        cols={pattern[index - Math.floor(index/pattern.length)*pattern.length].cols} 
                        rows={pattern[index - Math.floor(index/pattern.length)*pattern.length].rows}
                        sx={{
                            cursor:"pointer",
                            opacity: ".7",
                            transition:'opacity .3s linear',
                            '&:hover':{opacity: 1}
                        }}
                    >   
                        <Options 
                            imageId = {item?.id}
                            imageURL = {item?.data?.imageURL}
                            userId = {item?.data?.userID}
                        />
                        <img
                            {...srcset(
                                item?.data?.imageURL, 
                                200, 
                                pattern[index - Math.floor(index/pattern.length)*pattern.length].rows, 
                                pattern[index - Math.floor(index/pattern.length)*pattern.length].cols 
                            )}
                            alt={ item?.data?.userName || item?.data?.userEmail}
                            loading="lazy"
                            onClick = {()=>{
                                setPhotoIndex(index);
                                setIsOpen(true);
                                setToZoom(false)
                            }}
                        />
                        <Typography
                            variant="body2"
                            component ="span"
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left:0,
                                color:"white",
                                background :"rgba(0,0,0,.3)",
                                p:"5px",
                                borderTopRightRadius: 8,
                            }}
                        >
                            {moment(item?.data?.timestamp?.toDate()).fromNow()}
                        </Typography>
                        <Tooltip
                            title = {item?.data?.userName || item?.data?.userEmail.split("@")[0]}
                            sx={{
                                position:'absolute',
                                bottom:'3px',
                                right: '3px'
                            }}
                        >
                            <Avatar
                                src = {item?.data?.userName || item?.data?.userEmail.split("@")[0]}
                                imgProps={{'aria-hidden':true}}
                            />
                        </Tooltip>
                    </ImageListItem>
                ))}
            </ImageList>
            {isOpen && (
                <Lightbox 
                    mainSrc = {documents[photoIndex]?.data?.imageURL}
                    nextSrc = {documents[(photoIndex + 1)%documents.length]?.data?.imageURL}
                    prevSrc = {documents[(photoIndex + documents.length -1)% documents.length]?.data?.imageURL}
                    onCloseRequest = {()=>setIsOpen(false)}
                    onMoveNextRequest = {()=>setPhotoIndex((photoIndex + 1)%documents.length)}
                    onMovePrevRequest = {()=>setPhotoIndex((photoIndex + documents.length -1)% documents.length)}
                    imageTitle = {documents[photoIndex]?.data?.userEmail}
                    imageCaption = "Wolankoda"
                />
            )}
        </>
    );
}

const pattern = [
	{
		rows: 2,
		cols: 2,
	},
	{
		rows: 1,
		cols: 1,
	},
	{
		rows: 1,
		cols: 1,
	},
	{
		rows: 1,
		cols: 2,
	},
	{
		rows: 1,
		cols: 2,
	},
	{
		rows: 2,
		cols: 2,
	},
	{
		rows: 1,
		cols: 1,
	},
	{
		rows: 1,
		cols: 1,
	},
];
