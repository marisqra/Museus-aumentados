import "./App.css"
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin"




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
      </Routes>

    </BrowserRouter>

    </>
  )
}

export default App
