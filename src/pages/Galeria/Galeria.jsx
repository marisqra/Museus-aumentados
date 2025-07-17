import { useEffect, useState } from "react";
import NavBar from "../../componentes/NavBar/NavBar";
import Pesquisa from "../../componentes/Pesquisa/Pesquisa";
import Footer from "../../componentes/footer/Footer";
import CardObra from "../../componentes/CardObra/CardObra";
import ModalCadastroObra from "../../componentes/ModalObras/ObraCadastro";
import { listarObras, criarObra, excluirObra, editarObra } from "../../api/obras";
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
  const [obraEditando, setObraEditando] = useState(null);

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
    setObraEditando(null);
    setModalAberto(true);
  }

  function modalReleitura(obraOriginal) {
    setTipoCadastro("releitura");
    setOriginal(obraOriginal);
    setObraEditando(null);
    setModalAberto(true);
  }

  function modalEditar(obra) {
    setTipoCadastro(obra.tipo);
    setObraEditando(obra);
    setModalAberto(true);
  }

  async function salvarObra(dados) {
    try {
      if (obraEditando) {
        await editarObra({ ...obraEditando, ...dados });
        setMensagem("Obra editada com sucesso!");
      } else {
        await criarObra(dados);
        setMensagem("Cadastro concluído com sucesso!");
      }

      const dadosAtualizados = await listarObras();
      setObras(dadosAtualizados);
      setModalAberto(false);
      setObraEditando(null);
      setOriginal(null);
    } catch (error) {
      console.error("Erro ao salvar obra:", error);
      setMensagem("Erro ao salvar obra. Tente novamente.");
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
        <h1>GERENCIAR GALERIA</h1>
        <img src="/Ilustrações/Star 11.svg" alt="Estrela decorativa" />
        <img src="/Ilustrações/Star 12.svg" alt="Estrela decorativa" />
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
                  onClick={() => modalEditar(obra)}
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
          setTipo={setTipoCadastro}
          onSalvar={salvarObra}
          onFechar={() => {
            setModalAberto(false);
            setObraEditando(null);
            setOriginal(null);
          }}
          originalId={Original ? Original.id : ""}
          obraEditando={obraEditando}
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
          textoBotao="Remover"
        />
      )}

      <Footer />
    </>
  );
}
