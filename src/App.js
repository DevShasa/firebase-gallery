import Nav from "./components/Nav";
import Upload from "./components/upload/Upload";
import Imagelist from "./components/imagesList/Imagelist";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Upload />
      <Imagelist />
    </div>
  );
}

export default App;
