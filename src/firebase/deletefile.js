import { deleteObject, ref } from "firebase/storage";
import { storage } from "./config";

const deleteFile = (filepath)=>{
    // delete a file given its filepath
    const imageRef = ref(storage, filepath);
    // returns a resolved promise once succesfuly deleted
    return deleteObject(imageRef)
}
export default deleteFile

