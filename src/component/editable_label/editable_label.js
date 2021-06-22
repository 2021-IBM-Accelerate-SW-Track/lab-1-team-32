import React, {useState} from "react";

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

export default function Editable_Label(props){
    const[editMode, setEditMode] = useState(false);
    const[newText, setNewText] = useState('');

    let label;
    if(!editMode){
        label = <p>{props.text}</p>;
    } else {
        label = <TextField defaultValue={newText} onChange={(event)=>{setNewText(event.target.value)}}></TextField>;
    }

    return(
        <div>
            {label}
            <Button variant="contained" color="primary"
            onClick={()=>{
                if(!editMode)
                    setNewText(props.text);
                else {
                    props.onSubmitEdit(newText);
                }
                setEditMode(!editMode);
            }}>Edit</Button>
        </div>
    );
}