import "./Pesquisa.css";
import Botao from "../../componentes/botão/Botao";
import { MdSearch } from "react-icons/md";  // Importa o ícone de busca do Material Design

export default function Pesquisa() {
    return (
        <div className="container-pesquisa">
            <div className="campo-pesquisa">
                <span className="icone-pesquisa">
                    <MdSearch size={20} color="#fffff" />
                </span>
                <input
                    type="text"
                    className="input-pesquisa"
                    placeholder="Pesquise por nome, email ou permissão do usuário."
                />
            </div>
            <Botao
                className="botao-pesquisa"
                property1="filtro"
                text="CADASTRAR NOVO PERFIL"
            />
            <Botao
                className="botao-pesquisa"
                property1="filtro"
                text="FILTRO"
            />
        </div>
    );
}
