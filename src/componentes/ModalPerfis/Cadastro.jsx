import { useState } from "react";
import "./Cadastro.css";
import Botao from "../Botão/Botao";

export default function Cadastro({ onSalvar, onFechar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const enviar = () => {
    if (!nome || !email) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      setErro("Por favor, insira um email válido.");
      return;
    }

    setErro("");
    onSalvar({ nome, email });
  };

  return (
    <div className="modal-container">
      <div className="modal-cadastro">
        <button
          className="botao-fechar-modal"
          onClick={onFechar}
          aria-label="Fechar modal"
        >
          ×
        </button>
        <h2>Cadastrar Perfil</h2>
        <h3>Informações do perfil</h3>

        <div className="formulario-cadastro">
          <div className="campo-formulario">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="botoes-modal">
          <Botao texto="Cancelar" onClick={onFechar} />
          <Botao texto="Confirmar Cadastro" preenchido onClick={enviar} />
        </div>
      </div>
    </div>
  );
}
