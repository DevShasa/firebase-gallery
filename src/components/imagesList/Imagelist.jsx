import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TestProfile from "../../img/profile.jpg";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import Options from './Options';

function srcset(image, size, rows = 1, cols = 1) {
    // if an image takes two rows and two colums, multiply this by size to give corrext size
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
        size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function QuiltedImageList() {

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
                {itemData.map((item, index) => (
                    <ImageListItem 
                        key={item.title} 
                        cols={pattern[index - Math.floor(index/pattern.length)*pattern.length].cols} 
                        rows={pattern[index - Math.floor(index/pattern.length)*pattern.length].rows}
                        sx={{
                            cursor:"pointer",
                            opacity: ".7",
                            transition:'opacity .3s linear',
                            '&:hover':{opacity: 1}
                        }}
                    >   
                        <Options />
                        <img
                            {...srcset(
                                item.img, 
                                200, 
                                pattern[index - Math.floor(index/pattern.length)*pattern.length].rows, 
                                pattern[index - Math.floor(index/pattern.length)*pattern.length].cols 
                            )}
                            alt={item.title}
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
                            {moment(new Date() - 500 * 60 * 60).fromNow()}
                        </Typography>
                        <Tooltip
                            title = "Wolankoda"
                            sx={{
                                position:'absolute',
                                bottom:'3px',
                                right: '3px'
                            }}
                        >
                            <Avatar
                                src = {TestProfile}
                                imgProps={{'aria-hidden':true}}
                            />
                        </Tooltip>
                    </ImageListItem>
                ))}
            </ImageList>
            {isOpen && (
                <Lightbox 
                    mainSrc = {itemData[photoIndex].img}
                    nextSrc = {itemData[(photoIndex + 1)%itemData.length].img}
                    prevSrc = {itemData[(photoIndex + itemData.length -1)% itemData.length].img}
                    onCloseRequest = {()=>setIsOpen(false)}
                    onMoveNextRequest = {()=>setPhotoIndex((photoIndex + 1)%itemData.length)}
                    onMovePrevRequest = {()=>setPhotoIndex((photoIndex + itemData.length -1)% itemData.length)}
                    imageTitle = {itemData[photoIndex].title}
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

const itemData = [
    {
        img: TestProfile,
        title: "Picha Yangu"
    },
	{
		img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
		title: "Breakfast",
	},
	{
		img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
		title: "Burger",
	},
	{
		img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
		title: "Camera",
	},
	{
		img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
		title: "Coffee",
	},
	{
		img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
		title: "Hats",
	},
	{
		img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
		title: "Honey",
		author: "@arwinneil",
	},
	{
		img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
		title: "Basketball",
	},
	{
		img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
		title: "Fern",
	},
	{
		img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
		title: "Mushrooms",
	},
	{
		img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
		title: "Tomato basil",
	},
	{
		img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
		title: "Sea star",
	},
	{
		img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
		title: "Bike",
	},
];