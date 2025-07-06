import "./App.css"
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin"
import Galeria from "./pages/Galeria/Galeria"




function App() {

  return (
    <>
      <ul>
        <a href={"/"}>Home</a>
        <a href={"admin"}>Admin</a>
        <a href="/galeria">Galeria</a>
      </ul>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/galeria' element={<Galeria />} />
      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App
