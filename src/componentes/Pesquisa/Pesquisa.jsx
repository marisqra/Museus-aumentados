import "./Pesquisa.css";
import Botao from "../botao/Botao";
import { MdSearch } from "react-icons/md";

export default function Pesquisa({
  termo,
  onBuscar,
  onCadastrar,
  placeholder = "Pesquise por nome ou email do usuário",
  textoBotaoCadastrar = "CADASTRAR NOVO PERFIL",
}) {
  return (
    <div className="container-pesquisa">
      <div className="campo-pesquisa">
        <span>
          <MdSearch size={20} color="#ffffff" />
        </span>
        <input
          type="text"
          className="input-pesquisa"
          placeholder={placeholder}
          value={termo}
          onChange={(e) => onBuscar(e.target.value)}
        />
      </div>

      <Botao
        cor="#ffffff"
        texto={textoBotaoCadastrar}
        onClick={onCadastrar}
      />
    </div>
  );
}
