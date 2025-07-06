import "./Botao.css";

export default function Botao({
  cor = "#121212",
  texto = "FILTROS",
  onClick,
  preenchido = false,
  className = "",
}) {
  const estiloBotao = {
    borderColor: cor,
    backgroundColor: preenchido ? cor : "transparent",
    color: preenchido ? "#ffffff" : cor,
  };

  return (
    <button
      className={`botao-base ${className}`}
      style={estiloBotao}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}
