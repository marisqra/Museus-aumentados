import NavBar from "./componentes/NavBar/NavBar"
import CardObra from "./componentes/Card-obra/Card-obra"
import Botao from "./componentes/botão/Botao"
import "./App.css"
import Footer from "./componentes/footer/Footer"




function App() {

  return (
    <>
      <NavBar />
      <section class="hero-section">
        <div>
          <h1>Explore a Galeria</h1>
          <p>Explore o acervo de forma diferente. Cada tag é um convite à descoberta,
            experimente combinações e veja a galeria se transformar.</p>
          <Botao />
        </div>
        <img src="public/assets/Homi.svg" />
      </section>
      <section class="galery">
        <div class="card-container">
          <CardObra />
          <CardObra />
          <CardObra />
          <CardObra />
          <CardObra />
          <CardObra />
        </div>
      </section>

      <section class="footer-section">
        <img src="public/assets/Onda.svg" alt="" />
        <Footer />
      </section>



    </>
  )
}

export default App
