import { useState } from "react";
import NavBar from "../../componentes/NavBar/NavBar";
import Pesquisa from "../../componentes/Pesquisa/Pesquisa";
import TabelaUsuarios from "../../componentes/Tabela/Tabela";
import Footer from "../../componentes/footer/Footer";
import "./Admin.css";

function Admin() {
  const [mensagem, setMensagem] = useState("");

  return (
    <>
      <NavBar tipo="adm" />

      {mensagem && (
        <div className="mensagem-toast" role="alert" aria-live="assertive">
          {mensagem}
          <button onClick={() => setMensagem("")} className="toast-fechar" aria-label="Fechar mensagem">
            ×
          </button>
        </div>
      )}

      <section className="hero-section-admin">
        <h1>Gerenciar Perfis</h1>
        <img src="/Ilustrações/Star 5.svg" alt="Estrela decorativa" />
      </section>

      <Pesquisa />

      <TabelaUsuarios setMensagem={setMensagem} />

      <Footer />
    </>
  );
}

export default Admin;
