import { useEffect, useState } from "react";
import Masonry from 'react-masonry-css';
import "./Home.css";
import Botao from "../../componentes/botao/Botao";
import CardObra from "../../componentes/CardObra/CardObra";
import Footer from "../../componentes/Footer/Footer";
import NavBar from "../../componentes/NavBar/NavBar";
import { listarObras } from "../../api/obras"; // certifique-se de importar isso corretamente

function Home() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    async function carregarObras() {
      const dados = await listarObras();
      setObras(dados);
    }

    carregarObras();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    600: 1
  };

  return (
    <>
      <NavBar tipo="visitante" />

      <section className="hero-section">
        <div>
          <h1>Explore a Galeria</h1>
          <p>Explore o acervo de forma diferente. Cada tag é um convite à descoberta,
            experimente combinações e veja a galeria se transformar.</p>
          <Botao cor="#ffffff" property1="filtro" text="FILTROS" />
        </div>
        <img src="/assets/Homi.svg" alt="Ilustração decorativa" />
      </section>

      <section className="galery">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="card-container"
          columnClassName="card-masonry-column"
        >
          {obras.map((obra) => (
            <CardObra key={obra.id} obra={obra} />
          ))}
        </Masonry>
      </section>

      <Footer />
    </>
  );
}

export default Home;
