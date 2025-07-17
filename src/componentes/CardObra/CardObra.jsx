import Tag from "../tag/tag";
import "./CardObra.css";

export default function CardObra({ obra, children }) {
  const tagsArray = Array.isArray(obra.tags)
    ? obra.tags
    : typeof obra.tags === "string"
    ? obra.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className="card-obra">
      <div className="imagem">
        {obra.imagem && (
          <img src={obra.imagem} alt={`Imagem de ${obra.titulo}`} />
        )}
      </div>

      <div className="info-obra">
        <h3 className="titulo-obra">{obra.titulo}</h3>

        <div className="tags">
          {tagsArray.map((tag) => (
            <Tag
              key={tag}
              cor="branco"
              fill="empty"
              text={tag}
            />
          ))}
        </div>

        {children && <div className="acoes">{children}</div>}
      </div>
    </div>
  );
}
