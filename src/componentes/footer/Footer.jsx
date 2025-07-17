import "./Footer.css";
import { MdEmail, MdPhone } from "react-icons/md";

export default function Footer({ corFundo = "#9B1C31", onda = "/Ilustrações/Onda.svg" }) {
  return (
    <>
      <div className="onda-rodape">
        <img src={onda} alt="Ilustração decorativa do rodapé" />
      </div>

      <footer className="rodape" style={{ backgroundColor: corFundo }}>
        <div className="conteudo-rodape">
          <div className="logo-rodape">
            <img src="/Ilustrações/LOGO MUSEUS.svg" alt="Logo do projeto" />
          </div>

          <div className="info-rodape">
            <p className="descricao-rodape">
              Para dúvidas, sugestões ou parcerias, entre em contato.
            </p>

            <div className="contato-rodape">
              <div className="contato-item">
                <MdEmail />
                <span>jaovinei@gmail.com</span>
              </div>
              <div className="contato-item">
                <MdPhone />
                <span>(88) 40028922</span>
              </div>
            </div>
          </div>
        </div>

        <p className="copy-rodape">©2025, Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
