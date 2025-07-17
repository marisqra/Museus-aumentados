import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ tipo }) {
  const links = {
    adm: [
      { nome: "Galeria", rota: "/galeria" },
      { nome: "Museus", rota: "/museus" },
      { nome: "Administração", rota: "/admin" }
    ],
    visitante: [
      { nome: "Sobre o projeto"},
      { nome: "Explore a galeria"},
      { nome: "Museus" }
    ]
  };

  const itens = links[tipo] || links.visitante;

  return (
    <div className="navbar">
      <div className="frame">
        {itens.map((item, index) => (
          <Link to={item.rota} key={index} className="textWrapper">
            {item.nome}
          </Link>
        ))}
      </div>
    </div>
  );
}
