/**
 * Delete a document from a collection
 */

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";

const deleteDocument = (collectionName, documentId)=>{
    // returns a resolved promise once succesfuly deleted
    return deleteDoc(doc(db, collectionName, documentId))
}

export default deleteDocument 