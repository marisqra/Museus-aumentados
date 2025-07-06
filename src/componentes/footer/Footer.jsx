import "./Footer.css";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="conteudo-rodape">
        <div className="logo-rodape"></div>

        <div className="info-rodape">
          <p className="descricao-rodape">
            Para dúvidas, sugestões ou parcerias, entre em contato.
          </p>

          <div className="contato-rodape">
            <span>jaovinei@gmail.com</span>
            <span>(88) 40028922</span>
          </div>
        </div>
      </div>

      <hr className="divisor-rodape" />
      <p className="copy-rodape">©2025, Todos os direitos reservados.</p>
    </footer>
  );
}
