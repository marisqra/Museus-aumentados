import Botao from "../botão/Botao";
import "./Card-obra.css"

export default function CardObra() {
    return (
        <div className="frame">
            <div className="div" />

            <div className="div-2">
                <div className="text-wrapper">Nome da obra</div>

                <div className="div-3">
                    <Botao
                        className="boto"
                        cor="branco"
                        divClassName="bot-o-instance"
                        fill="empty"
                        text="TAG"
                    />
                    <Botao
                        className="boto"
                        cor="branco"
                        divClassName="bot-o-instance"
                        fill="empty"
                        text="TAG"
                    />
                    <Botao
                        className="boto"
                        cor="branco"
                        divClassName="bot-o-instance"
                        fill="empty"
                        text="TAG"
                    />
                </div>
            </div>
        </div>
    );
}
