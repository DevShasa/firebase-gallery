import { ImageList } from '@mui/material';
import ProgressItem from './ProgressItem';


const ProgressList = ({files}) => {
    
    const isFileAnImg = (selectedFile) =>{
        return selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/jpg'|| selectedFile.type === 'image/webp'
    }

    return (
        <ImageList rowHeight={200} cols={4} sx={{marginTop:"1rem"}}>
            {files.map((file, index)=>{
                // only upload images, ignore other file types
                console.log(file.type)
                return isFileAnImg(file) && <ProgressItem file={file} key={index} />
            })}
        </ImageList>
    )
}

export default ProgressList