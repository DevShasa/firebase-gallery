import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./config";

const updateUserRecords = (collectionName, uid, updateObject ) =>{
    return new Promise(async(resolve, reject)=>{
        const q = query(collection(db, collectionName), where('userID', '==', uid));
        try{
            const snapshot = await getDocs(q)
            const updatePromises = []
            snapshot.forEach((document)=>{
                updatePromises.push(
                    updateDoc(doc(db, collectionName, document.id), updateObject)
                );
            });
            await Promise.all(updatePromises)
            resolve();
        }catch(error){
            reject(error)
        }
    });
};
export default updateUserRecords;