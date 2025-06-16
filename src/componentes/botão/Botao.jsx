import "./Botao.css";

export default function Botao({
    cor,
    fill,
    className,
    divClassName,
    text = "FILTROS",
    onClick,
}) {
    return (
        <div
            className={`button-container ${fill} ${cor} ${className || ""}`}
            onClick={onClick}
        >
            <div className={`button-text ${divClassName || ""}`}>{text}</div>
        </div>
    );
}
