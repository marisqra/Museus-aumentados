import "./NavBar.css";

export default function NavBar({ tipo }) {
  const links = {
    adm: ["Galeria", "Museus", "Administração"],
    visitante: ["Sobre o projeto", "Explore a galeria", "Museus"]
  };

  const itens = links[tipo] || links.visitante;

  return (
    <div className="navbar">
      <div className="frame">
        {itens.map((item, index) => (
          <div key={index} className="text-wrapper">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
