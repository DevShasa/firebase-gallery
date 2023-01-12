import { useState } from 'react';
import Form from "./Form";
import ProgressList from './progressList/ProgressList';

const Upload = () => {
    const [ files, setFiles ] = useState([]) // lifting up the state
    return (
        <div>
            <Form setFiles={setFiles}/>
            <ProgressList files={files} />
        </div>
    )
}

export default Upload