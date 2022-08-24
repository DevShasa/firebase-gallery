import Nav from "./components/Nav";
import Upload from "./components/upload/Upload";
import QuiltedImageList from "./components/imagesList/Imagelist";
import { Container } from "@mui/material";
import AuthContext from "./context/authContext";

function App() {
  return (
    <Container maxWidth="lg" sx={{textAlign: 'center', mt: '3rem'}}>
        <AuthContext>
            <Nav/>
            <Upload />
            <QuiltedImageList />
        </AuthContext>
    </Container>
  );
}

export default App;
