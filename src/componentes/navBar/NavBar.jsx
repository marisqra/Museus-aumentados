import "./NavBar.css";

export default function NavBar({ tipo }) {
  // Definindo os links para cada tipo de usuário
  const links = {
    adm: ["Galeria", "Museus", "Administração"],
    visitante: ["Sobre o projeto", "Explore a galeria", "Museus"]
  };

  // Pega os links conforme o tipo; padrão para visitante
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
