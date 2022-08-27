import Send from "@mui/icons-material/Send";
import Button from "@mui/material/Button"; 


const SubmitButton = () => {
    return (
        <Button variant="contained" endIcon={<Send/>} type="submit">
            Submit
        </Button>
    );
};

export default SubmitButton