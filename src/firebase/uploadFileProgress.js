/**
 * Upload a file to firebase storage, return progress
 */

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from './config';

const uploadFileProgress = (file, subFolder, imageName, setProgress) =>{

    return new Promise((resolve, reject)=>{
        const storageRef = ref(storage, subFolder+'/'+imageName)
        const upload = uploadBytesResumable(storageRef, file);

        upload.on(
            // on state change
            'state_change',
            // grab snapshot to get progress and update snapshot hook
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
            },
            // if error reject promise
            (error)=>{ reject(error) },
            // get uploaded url and return it if present
            async ()=>{
                try {
                    const url = await getDownloadURL(storageRef)
                    resolve(url)
                }catch(error){
                    reject(error)
                }
            }
        );
    });
};

export default uploadFileProgress