import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo" />

                <div className="footer-info">
                    <p className="footer-description">
                        Para dúvidas, sugestões ou parcerias, entre em contato.
                    </p>

                    <div className="footer-contact">
                        <div className="footer-item">

                            <span>jaovinei@gmail.com</span>
                        </div>
                        <div className="footer-item">

                            <span>(88) 40028922</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />

            <p className="footer-copy">©2025, All right reserved.</p>
        </footer>
    );
}
