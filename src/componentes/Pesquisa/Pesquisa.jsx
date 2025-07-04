import "./Pesquisa.css";
import Botao from "../../componentes/botão/Botao";
import { MdSearch } from "react-icons/md";

export default function Pesquisa({ termo, onBuscar, onCadastrar }) {
    return (
        <div className="container-pesquisa">
            <div className="campo-pesquisa">
                <span className="icone-pesquisa">
                    <MdSearch size={20} color="#ffffff" />
                </span>
                <input
                    type="text"
                    className="input-pesquisa"
                    placeholder="Pesquise por nome ou email do usuário"
                    value={termo}
                    onChange={(e) => onBuscar(e.target.value)}
                />
            </div>

            <Botao
                className="botao-pesquisa"
                cor="#ffffff"
                texto="CADASTRAR NOVO PERFIL"
                onClick={onCadastrar}
            />
        </div>
    );
}
