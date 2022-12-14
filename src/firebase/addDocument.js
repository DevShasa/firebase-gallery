/**
 * create a new document in a collection
 */

import { 
    // collection, 
    doc, 
    serverTimestamp, 
    setDoc 
} from 'firebase/firestore';
import { db } from './config';

const addDocument = (collectionName, documentObj, id)=>{
    // const collectionRef = collection(db, collectionName) // create a reference to a collection 
    // const newDocRef =  doc(collectionRef, id);  // create a reference to a document i.e gallery/imageId
    const newDocRef = doc(db, collectionName, id)
    return setDoc(newDocRef, 
        {
            ...documentObj,
            timestamp: serverTimestamp()
        }
    )
}

export default addDocument