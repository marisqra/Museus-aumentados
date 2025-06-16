import "./tag.css";

export default function Tag({
    cor,
    fill,
    className,
    divClassName,
    text = "TAG",
}) {
    return (
        <div className={`tag-container ${fill} ${cor} ${className || ""}`}>
            <div className={`tag-text ${divClassName || ""}`}>{text}</div>
        </div>
    );
}
