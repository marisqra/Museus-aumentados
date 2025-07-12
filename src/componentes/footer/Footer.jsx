//nico colocou o icone mas bugou no meu 

import "./Footer.css";
import { MdEmail, MdPhone } from "react-icons/md";

export default function Rodape() {
  return (
    <>
    <div className="onda-rodape">
        <img src="/Ilustrações/Onda.svg" alt="Onda decorativa" />
      </div>
    <footer className="rodape">
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
               <MdEmail className="footer-icon" />
               <span>jaovinei@gmail.com</span>
            </div>
            <div className="contato-item">
              <MdPhone className="footer-icon" />
              <span>(88) 40028922</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="divisor-rodape" />
      <p className="copy-rodape">©2025, Todos os direitos reservados.</p>
    </footer>
  </>
  );
}
