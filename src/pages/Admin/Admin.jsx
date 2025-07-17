import { useEffect, useState } from "react";
import NavBar from "../../componentes/NavBar/NavBar";
import Pesquisa from "../../componentes/Pesquisa/Pesquisa";
import TabelaUsuarios from "../../componentes/Tabela/Tabela";
import Footer from "../../componentes/footer/Footer";
import ModalCadastroPerfil from "../../componentes/ModalPerfis/Cadastro";
import { listarPerfis, criarPerfil, removerPerfil } from "../../api/perfis";
import "./Admin.css";

function Admin() {
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [perfis, setPerfis] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [perfisFiltrados, setPerfisFiltrados] = useState([]);

  useEffect(() => {
    async function carregar() {
      const dados = await listarPerfis();
      setPerfis(dados);
      setPerfisFiltrados(dados);
    }
    carregar();
  }, []);

  useEffect(() => {
    const filtrar = () => {
      if (!termoPesquisa) {
        setPerfisFiltrados(perfis);
        return;
      }

      const termoEmMinusculas = termoPesquisa.toLowerCase();
      const resultados = perfis.filter(perfil => {
        const nomeMatch = perfil.nome.toLowerCase().includes(termoEmMinusculas);
        const emailMatch = perfil.email.toLowerCase().includes(termoEmMinusculas);

        const permissoesMatch = Array.isArray(perfil.permissoes) &&
          perfil.permissoes.some(perm =>
            perm.toLowerCase().includes(termoEmMinusculas)
          );

        const permissaoStringMatch = typeof perfil.permissoes === 'string' &&
          perfil.permissoes.toLowerCase().includes(termoEmMinusculas);

        return nomeMatch || emailMatch || permissoesMatch || permissaoStringMatch;
      });
      setPerfisFiltrados(resultados);
    };

    filtrar();
  }, [perfis, termoPesquisa]);

  const cadastrarPerfil = async (novoPerfil) => {
    try {
      const perfilCriado = await criarPerfil(novoPerfil);
      setPerfis(prevPerfis => [...prevPerfis, perfilCriado]);
      setMensagem("Perfil cadastrado com sucesso!");
      setModalAberto(false);
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      setMensagem("Erro ao cadastrar perfil.");
    }
  };

  const removerPerfilHandler = async (usuario) => {
    try {
      await removerPerfil(usuario.id);
      setPerfis(prevPerfis => prevPerfis.filter((p) => p.id !== usuario.id));
      setMensagem("Perfil removido com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    } catch (erro) {
      console.error("Erro ao remover perfil:", erro);
      setMensagem("Erro ao remover perfil.");
    }
  };

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
        <h1>GERENCIAR PERFIS</h1>
        <img src="/Ilustrações/Star 5.svg" alt="Estrela decorativa" />
        <img src="/Ilustrações/Star 11.svg" alt="Estrela decorativa" />
      </section>

      <Pesquisa
        termo={termoPesquisa}
        onBuscar={setTermoPesquisa}
        onCadastrar={() => setModalAberto(true)}
      />


      <TabelaUsuarios
        perfis={perfisFiltrados}
        setMensagem={setMensagem}
        aoRemoverPerfil={removerPerfilHandler}
      />

      {modalAberto && (
        <ModalCadastroPerfil
          onSalvar={cadastrarPerfil}
          onFechar={() => setModalAberto(false)}
        />
      )}

      <Footer
            corFundo="#D0353F"
            onda="/Ilustrações/OndaRosa.svg"
            />
    </>
  );
}

export default Admin;