import Tag from "../Tag/tag";
import "./CardObra.css";

export default function CardObra({ obra, children }) {
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
                    {obra.tags?.split(",").map((tag, index) => (
                        <Tag
                            key={index}
                            className="tag"
                            cor="branco"
                            divClassName="tag-text"
                            fill="empty"
                            text={tag.trim()}
                        />
                    ))}
                </div>

                {children && <div className="acoes">{children}</div>}
            </div>
        </div>
    );
}
