import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../api/firebase";
import Pesquisa from "../../componentes/Pesquisa/Pesquisa";
import NavBar from "../../componentes/NavBar/NavBar";
import Footer from "../../componentes/footer/Footer";
import CadastroMuseus from "../../componentes/ModalMuseus/CadastroMuseus";
import "./Museus.css";

export default function Museus() {
  const [modalAberto, setModalAberto] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [museus, setMuseus] = useState([]);

  useEffect(() => {
    const museusRef = ref(database, "museus");
    onValue(museusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.entries(data).map(([id, dados]) => ({
          id,
          ...dados,
        }));
        setMuseus(lista);
      } else {
        setMuseus([]);
      }
    });
  }, []);

  const museusFiltrados = museus.filter((museu) =>
    museu.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <>
      <NavBar tipo="adm" />
      <section className="hero-section-admin">
        <h1>GERENCIAR MUSEUS</h1>
        <img src="/Ilustrações/Star 2.svg" alt="Estrela decorativa" />
        <img src="/Ilustrações/Star 7.svg" alt="Estrela decorativa" />
      </section>

      <Pesquisa
        termo={termoPesquisa}
        onBuscar={setTermoPesquisa}
        onCadastrar={() => setModalAberto(true)}
        textoBotaoCadastrar="Cadastrar Novo Museu"
      />

      <section className="page-content">
        {museusFiltrados.map((museu) => (
          <div key={museu.id} className="card-horizontal">
            <h2>{museu.nome}</h2>
            <p>{museu.descricao}</p>
          </div>
        ))}
      </section>

      <Footer
      corFundo="#283055"
      onda="/Ilustrações/OndaAzul.svg"
      />

      {modalAberto ? (
  <>
    {console.log("Modal deve aparecer")}
    <CadastroMuseus onFechar={() => setModalAberto(false)} />
  </>
) : null}
    </>
  );
}
