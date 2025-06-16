import Tag from "../tag/tag";
import "./Card-obra.css";

export default function CardObra() {
    return (
        <div className="card-obra">
            <div className="imagem" />

            <div className="info-obra">
                <h3 className="titulo-obra">Nome da obra</h3>

                <div className="tags">
                    <Tag
                        className="tag"
                        cor="branco"
                        divClassName="tag-text"
                        fill="empty"
                        text="TAG 1"
                    />
                    <Tag
                        className="tag"
                        cor="branco"
                        divClassName="tag-text"
                        fill="empty"
                        text="TAG 2"
                    />
                    <Tag
                        className="tag"
                        cor="branco"
                        divClassName="tag-text"
                        fill="empty"
                        text="TAG 3"
                    />
                </div>
            </div>
        </div>
    );
}
