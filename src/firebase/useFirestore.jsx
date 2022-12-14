/**
 * Create a snapshot of image collection that updates whenever collection changes
 */

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { db } from "./config";
import { useAuth } from "../context/authContext";

const useFirestore = (collectionName="gallery") => {
    const { setAlert } = useAuth();
    const [ documents, setDocuments ] = useState([])

    useEffect(()=>{
        const q = query(collection(db, collectionName), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot)=>{
            const docs = [];
            snapshot.forEach((doc)=>{
                docs.push({id: doc.id, data:doc.data()})
                setDocuments(docs)
            })},
            (error)=>{
                setAlert({
                    isAlert: true,
                    severity: "error",
                    message: error.message,
                    timeout: 9000,
                    location: "main"
                })
                console.log(error);
            }
        );
    
    return () => unsubscribe(); // stop listening to changes 

    },[collectionName]) // eslint-disable-line

    return {documents}
}

export default useFirestore