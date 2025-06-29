import "./Modal.css";

export default function ModalConfirmacao({ onConfirmar, onCancelar }) {
    return (
        <div className="modal">
            <div className="modal-conteudo">
                <p className="modal-titulo">Deseja remover o perfil?</p>
                <p className="modal-texto">Depois da remoção, este usuário não conseguirá mais entrar no sistema.</p>
                <div className="modal-botoes">
                    <button onClick={onCancelar}>Cancelar</button>
                    <button onClick={onConfirmar}>Remover perfil</button>
                </div>
            </div>
        </div>
    );
}
