import "./Botao.css";

export default function Botao({
  cor = "#ffffff",
  texto = "FILTROS",
  onClick,
  preenchido = false,
  className = "",
  mostrarFechar = false,
  onFechar = null,
}) {
  const estiloBotao = {
    borderColor: preenchido ? "#000000" : cor,
    backgroundColor: preenchido ? "#ffffff" : "transparent",
    color: preenchido ? "#000000" : cor,
    position: "relative",
    paddingRight: mostrarFechar ? 32 : undefined,
  };

  return (
    <button
      className={`botao-base ${className}`}
      style={estiloBotao}
      onClick={onClick}
    >
      {texto}
      {mostrarFechar && (
        <span
          className="icone-fechar"
          onClick={(e) => {
            e.stopPropagation();
            if (onFechar) onFechar();
          }}
        >
          ✕
        </span>
      )}
    </button>
  );
}
