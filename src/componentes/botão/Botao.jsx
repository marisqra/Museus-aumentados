import "./Botao.css";

export default function Botao({
    cor,
    fill,
    className,
    divClassName,
    text = "FILTROS",
}) {
    return (
        <div className={`bot-o ${fill} ${cor} ${className || ""}`}>
            <div className={`FILTROS ${divClassName || ""}`}>{text}</div>
        </div>
    );
}

