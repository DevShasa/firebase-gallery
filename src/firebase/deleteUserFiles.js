/**
 * Delete all the files that belong to a user
 */

import { collection, getDocs, query, where } from "firebase/firestore";
import { db  } from "./config";
import deleteDocument from "./deleteDocument";
import deleteFile from "./deletefile";

const deleteUserFiles = (collectionName, currentUser)=>{
    return new Promise(async (resolve, reject)=>{
        const q = query(collection(db, collectionName), where('userID', '==', currentUser.uid))
        try{
            const snapshot = await getDocs(q);
            const galleryDocumentPromises = []
            const photoStoragePromises = []
            snapshot.forEach((document)=>{
                galleryDocumentPromises.push(deleteDocument(collectionName, document.id));
                // document.id includes file extention so it is the name of the file
                photoStoragePromises.push(deleteFile(`${collectionName}/${currentUser.uid}/${document.id}`));
            });
            await Promise.all(galleryDocumentPromises);
            await Promise.all(photoStoragePromises);

            if(currentUser?.photoURL){
                const photoName = currentUser?.photoURL?.split(`${currentUser?.uid}%2F`)[1].split("?")[0]
                if(photoName){
                    try{
                        await deleteFile(`profile/${currentUser.uid}/${photoName}`);
                    }catch(error){
                        console.log("ERROR WHILE DELETING USER'S PROFILE PICTURE--->", error)
                    }
                }
            }

            resolve()
        }catch(error){
            reject(error)
        }
    })
}

export default deleteUserFiles