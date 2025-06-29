import React, { useState } from "react"; // ou só import { useState } from "react";
import "./Tabela.css";
import { FaTrash } from "react-icons/fa";
import ModalConfirmacao from "../Modal/Modal";


export default function TabelaUsuarios({ setMensagem }) {
   const [usuarios, setUsuarios] = useState([
    { data: "30/04/2025", nome: "Nico Rabelo", email: "nicorabelo@example.com", permissoes: "Cadastro e Edição" },
    { data: "30/04/2025", nome: "Mariana Verde", email: "marianaverde@example.com", permissoes: "Cadastro e Edição" },
    { data: "30/04/2025", nome: "Yuri Lima", email: "yurilima@example.com", permissoes: "Cadastro e Edição" },
    { data: "30/04/2025", nome: "Rhian Martins", email: "rhianmartins@example.com", permissoes: "Edição" },
    { data: "30/04/2025", nome: "Adriel alguma coisa", email: "adrielalgumacoisa@gmail.com", permissoes: "Edição" },
    { data: "30/04/2025", nome: "Sávio Pacheco", email: "saviopacheco@gmail.com", permissoes: "Edição" },
  ]);

  const [usuarioParaRemover, setUsuarioParaRemover] = useState(null);

  const confirmarRemocao = (usuario) => {
    setUsuarioParaRemover(usuario);
  };

  const removerUsuario = () => {
    setUsuarios((prev) => prev.filter((u) => u !== usuarioParaRemover));
    setMensagem("Perfil removido com sucesso!");
    setUsuarioParaRemover(null);
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <>
      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>Data de início</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Permissões</th>
            <th className="coluna-remover">Remover</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.email}>
              <td>{usuario.data}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.permissoes.toLowerCase()}</td>
              <td>
                <button
                  className="botao-remover"
                  title="Remover"
                  onClick={() => confirmarRemocao(usuario)}
                  aria-label={`Remover usuário ${usuario.nome}`}
                >
                  <FaTrash size={16} color="#e74c3c" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioParaRemover && (
        <ModalConfirmacao
          onConfirmar={removerUsuario}
          onCancelar={() => setUsuarioParaRemover(null)}
        />
      )}
    </>
  );
}
