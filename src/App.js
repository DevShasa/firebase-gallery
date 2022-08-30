import Nav from "./components/Nav";
import Upload from "./components/upload/Upload";
import QuiltedImageList from "./components/imagesList/Imagelist";
import { Container } from "@mui/material";
import AuthContext from "./context/authContext";
import Modal from "./components/Modal";
import MainNotification from "./components/MainNotification";

function App() {
  return (
    <Container maxWidth="lg" sx={{textAlign: 'center', mt: '3rem'}}>
        <AuthContext>
            <Modal />
            <MainNotification /> 
            <Nav/>
            <Upload />
            <QuiltedImageList />
        </AuthContext>
    </Container>
  );
}

export default App;
