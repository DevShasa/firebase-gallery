import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { db } from "./config";

const useFirestore = (collectionName="gallery") => {
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
                console.log(error)
            }
        )
    
    return () => unsubscribe(); // stop listening to changes 

    },[collectionName])

    return {documents}
}

export default useFirestore