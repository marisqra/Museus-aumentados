import { useEffect, useState } from "react";
import Masonry from 'react-masonry-css';
import "./Home.css";
import Botao from "../../componentes/botao/Botao";
import CardObra from "../../componentes/CardObra/CardObra";
import Footer from "../../componentes/footer/Footer";
import NavBar from "../../componentes/NavBar/NavBar";
import Tag from "../../componentes/tag/tag";
import { listarObras } from "../../api/obras";

function Home() {
  const [obras, setObras] = useState([]);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const [todasTags, setTodasTags] = useState([]);

  useEffect(() => {
    async function carregarObras() {
      const dados = await listarObras();
      setObras(dados);

      const tagsUnicas = [
        ...new Set(dados.flatMap((obra) => obra.tags || []))
      ];
      setTodasTags(tagsUnicas);
    }

    carregarObras();
  }, []);

  function toggleTag(tag) {
    if (tagsSelecionadas.includes(tag)) {
      setTagsSelecionadas(tagsSelecionadas.filter(t => t !== tag));
    } else {
      setTagsSelecionadas([...tagsSelecionadas, tag]);
    }
  }

  const obrasFiltradas = tagsSelecionadas.length === 0
    ? obras
    : obras.filter((obra) =>
        obra.tags?.some((tag) => tagsSelecionadas.includes(tag))
      );

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
        <h1>EXPLORE A GALERIA</h1>
        <p>
          Explore o acervo de forma diferente. Cada tag é um convite à descoberta,
          experimente combinações e veja a galeria se transformar.
        </p>
      </div>
      <img src="/Ilustrações/Homi.svg" alt="Ilustração decorativa" />
      <img src="/Ilustrações/Continua.svg" alt="Estrela decorativa" />
      <img src="/Ilustrações/Pontilhada.svg" alt="Estrela decorativa" />

    </section>

    <section className="filtro">
      <Botao
        texto="FILTROS"
        preenchido={filtroAberto}
        onClick={() => setFiltroAberto(!filtroAberto)}
      />

      {filtroAberto && (
        <div className="caixa-tags">
          {todasTags.map((tag) => (
            <div key={tag} onClick={() => toggleTag(tag)} style={{ cursor: "pointer" }}>
              <Tag
                text={tag}
                className={tagsSelecionadas.includes(tag) ? "selecionada" : ""}
              />
            </div>
          ))}
        </div>
      )}

      {!filtroAberto && tagsSelecionadas.length > 0 && (
        <div className="tags-selecionadas">
          {tagsSelecionadas.map((tag) => (
            <div key={tag} onClick={() => toggleTag(tag)} style={{ cursor: "pointer" }}>
              <Tag text={tag} />
            </div>
          ))}
        </div>
      )}
    </section>

    <section className="galery">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="card-container"
        columnClassName="card-masonry-column"
      >
        {obrasFiltradas.map((obra) => (
          <CardObra key={obra.id} obra={obra} />
        ))}
      </Masonry>
    </section>

    <Footer />
  </>
);
}

export default Home;
