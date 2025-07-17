import "./App.css"
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Admin from "./pages/Admin/Admin"
import Galeria from "./pages/Galeria/Galeria"
import Museus from "./pages/Museus/Museus"




function App() {

  return (
    <>
      <ul>
        <a href={"/"}>Home</a>
        <a href={"admin"}>Admin</a>
      </ul>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/galeria' element={<Galeria />} />
        <Route path='/museus' element={<Museus />} />
      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App
