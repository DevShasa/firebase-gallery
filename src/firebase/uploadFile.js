import { getDownloadURL, ref, uploadBytes} from "firebase/storage"
import { storage } from "./config";

const uploadFile = (file, filePath) =>{
    return new Promise(async(resolve, reject)=>{
        // create a reference to the storage
        const storageRef = ref(storage, filePath);
        try{
            // upload data to the ref
            await uploadBytes(storageRef, file);
            // get the url of the uploaded file
            const url = await getDownloadURL(storageRef);
            resolve(url)
        }catch(error){
            reject(error)
        }
    })
}

export default uploadFile