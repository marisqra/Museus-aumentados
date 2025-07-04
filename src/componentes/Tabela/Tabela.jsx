import { useState } from "react";
import "./Tabela.css";
import { FaTrash } from "react-icons/fa";
import ModalConfirmacao from "../Modal/Modal";

export default function TabelaUsuarios({ perfis, setMensagem, aoRemoverPerfil }) {
  const [usuarioParaRemover, setUsuarioParaRemover] = useState(null);

  return (
    <>
      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th className="coluna-remover">Remover</th>
          </tr>
        </thead>
        <tbody>
          {perfis.length === 0 ? (
            <tr>
              <td colSpan={3} className="mensagem-vazia">
                Nenhum perfil cadastrado ainda.
              </td>
            </tr>
          ) : (
            perfis.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <button
                    className="botao-remover"
                    onClick={() => setUsuarioParaRemover(usuario)}
                  >
                    <FaTrash size={16} color="#e74c3c" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {usuarioParaRemover && (
        <ModalConfirmacao
          onConfirmar={() => {
            aoRemoverPerfil(usuarioParaRemover);
            setUsuarioParaRemover(null);
          }}
          onCancelar={() => setUsuarioParaRemover(null)}
        />
      )}
    </>
  );
}
