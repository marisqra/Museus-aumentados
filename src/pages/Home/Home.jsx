import "./Home.css"
import Botao from "../../componentes/botão/Botao";
import CardObra from "../../componentes/Card-obra/Card-obra";
import Footer from "../../componentes/footer/Footer";
import NavBar from "../../componentes/NavBar/NavBar";

function Home() {
  return (
    <>
      <NavBar tipo={"visitante"} />
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
      <Footer />



    </>
  )
}

export default Home;