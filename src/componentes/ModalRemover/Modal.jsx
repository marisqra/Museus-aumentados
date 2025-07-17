import "./Modal.css";

export default function ModalConfirmacao({
  onConfirmar,
  onCancelar,
  titulo = "Deseja remover?",
  texto = "Tem certeza que deseja remover este item?",
  textoBotao = "Remover"
}) {
  return (
    <div className="modal">
      <div className="modal-conteudo">
        <p className="modal-titulo">{titulo}</p>
        <p className="modal-texto">{texto}</p>
        <div className="modal-botoes">
          <button onClick={onCancelar}>Cancelar</button>
          <button onClick={onConfirmar}>{textoBotao}</button>
        </div>
      </div>
    </div>
  );
}
