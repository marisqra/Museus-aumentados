import NavBar from "./componentes/NavBar/NavBar"
import CardObra from "./componentes/Card-obra/Card-obra"
import Botao from "./componentes/botão/Botao"
import "./App.css"
import Footer from "./componentes/footer/Footer"




function App() {


  return (
    <>
    <NavBar />
      <h1>Explore a Galeria</h1>
      <p>Explore o acervo de forma diferente. Cada tag é um convite à descoberta,
         experimente combinações e veja a galeria se transformar.</p>
      <Botao/>
      <div class="card-container">
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
        <CardObra />
      </div>
      
      <Footer/>
 
      
    </>
  )
}

export default App
