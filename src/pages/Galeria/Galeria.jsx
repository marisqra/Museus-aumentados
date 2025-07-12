import { useEffect, useState } from "react";
import NavBar from "../../componentes/NavBar/NavBar";
import Pesquisa from "../../componentes/Pesquisa/Pesquisa";
import Footer from "../../componentes/Footer/Footer";
import CardObra from "../../componentes/CardObra/CardObra";
import ModalCadastroObra from "../../componentes/ModalObras/ObraCadastro";
import { listarObras, criarObra, excluirObra } from "../../api/obras";
import ModalConfirmacao from "../../componentes/ModalRemover/Modal";
import Masonry from "react-masonry-css";
import "./Galeria.css";

export default function Galeria() {
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoCadastro, setTipoCadastro] = useState("original");
  const [Original, setOriginal] = useState(null);
  const [obras, setObras] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [obraParaRemover, setObraParaRemover] = useState(null);

  useEffect(() => {
    async function carregarObras() {
      const dados = await listarObras();
      setObras(dados);
    }
    carregarObras();
  }, []);

  function modalOriginal() {
    setTipoCadastro("original");
    setOriginal(null);
    setModalAberto(true);
  }

  function modalReleitura(obraOriginal) {
    setTipoCadastro("releitura");
    setOriginal(obraOriginal);
    setModalAberto(true);
  }

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

  async function removerObra(id) {
    try {
      await excluirObra(id);
      const dadosAtualizados = await listarObras();
      setObras(dadosAtualizados);
    } catch (error) {
      console.error("Erro ao excluir obra:", error);
    }
  }


  const obrasFiltradas = obras.filter((obra) =>
    obra.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <>
      <NavBar tipo="adm" />

      {mensagem && (
        <div className="mensagem-toast" role="alert">
          {mensagem}
          <button
            onClick={() => setMensagem("")}
            className="toast-fechar"
            aria-label="Fechar mensagem"
          >
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

      <section className="card-container">
        <Masonry
          breakpointCols={{ default: 3, 900: 2, 600: 1 }}
          className="card-container"
          columnClassName="card-masonry-column"
        >
          {obrasFiltradas.map((obra) => (
            <CardObra key={obra.id} obra={obra}>
              <div className="botoes-card-obra">
                <button
                  className="botao-editar"
                  onClick={() => modalReleitura(obra)}
                >
                  Editar
                </button>
                <button
                  className="botao-excluir"
                  onClick={() => setObraParaRemover(obra.id)}
                >
                  Excluir
                </button>
              </div>
            </CardObra>
          ))}
        </Masonry>
      </section>

      {modalAberto && (
        <ModalCadastroObra
          tipo={tipoCadastro}
          onSalvar={cadastrarObra}
          onFechar={() => setModalAberto(false)}
          originalId={Original ? Original.id : ""}
        />
      )}

      {obraParaRemover && (
        <ModalConfirmacao
          onConfirmar={async () => {
            await removerObra(obraParaRemover);
            setObraParaRemover(null);
          }}
          onCancelar={() => setObraParaRemover(null)}
          titulo="Deseja remover esta obra?"
          texto="Depois da remoção, esta obra não aparecerá mais na galeria."
          textoBotao="Remover obra"
        />
      )}

      <Footer />
    </>
  );
}
