import { useEffect, useState } from "react";
import NavBar from "../../componentes/NavBar/NavBar";
import Pesquisa from "../../componentes/Pesquisa/Pesquisa";
import Footer from "../../componentes/Footer/Footer";
import CardObra from "../../componentes/CardObra/CardObra";
import ModalCadastroObra from "../../componentes/ModalObras/ObraCadastro";
import { listarObras, criarObra } from "../../api/obras";
import "./Galeria.css"

export default function Galeria() {
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState("original");
  const [Original, setOriginal] = useState(null);
  const [obras, setObras] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    async function carregarObras() {
      const dados = await listarObras();
      setObras(dados);
    }
    carregarObras();
  }, []);

  // Abre modal para cadastrar obra original
  function modalOriginal() {
    setTipoCadastro("original");
    setOriginal(null);
    setModalAberto(true);
  }

  // Abre modal para cadastrar releitura vinculada a obra original
  function modalReleitura(obraOriginal) {
    setTipoCadastro("releitura");
    setOriginal(obraOriginal);
    setModalAberto(true);
  }

  // Função chamada ao salvar obra no modal
  async function cadastrarObra(novaObra) {
    try {
      await criarObra(novaObra);
      const dadosAtualizados = await listarObras();
      setObras(dadosAtualizados);
      setModalAberto(false);
      setOriginal(null);
    } catch (error) {
      console.error("Erro ao cadastrar obra:", error);
    }
  }

  // Filtra obras pelo termo de pesquisa (exemplo simples pelo título)
  const obrasFiltradas = obras.filter((obra) =>
    obra.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <>
      <NavBar tipo="adm" />

      {mensagem && (
        <div className="mensagem-toast" role="alert">
          {mensagem}
          <button onClick={() => setMensagem("")} className="toast-fechar" aria-label="Fechar mensagem">
            ×
          </button>
        </div>
      )}

      <section className="hero-section-admin">
        <h1>Gerenciar Galeria</h1>
        <img src="/Ilustrações/Star 5.svg" alt="Estrela decorativa" />
      </section>

      <Pesquisa
        termo={termoPesquisa}
        onBuscar={setTermoPesquisa}
        onCadastrar={modalOriginal}
        placeholder="Pesquise por título ou autor da obra"
        textoBotaoCadastrar="Cadastrar Nova Obra"
      />

      <section className="lista-obras">
        {obrasFiltradas.map((obra) => (
          <CardObra key={obra.id} obra={obra}>
            <button onClick={() => modalReleitura(obra)}>
              Cadastrar Releitura
            </button>
          </CardObra>
        ))}
      </section>

      {modalAberto && (
        <ModalCadastroObra
          tipo={tipoCadastro}
          onSalvar={cadastrarObra}
          onFechar={() => setModalAberto(false)}
          originalId={Original ? Original.id : ""}
        />
      )}



      <Footer />
    </>
  );
}
