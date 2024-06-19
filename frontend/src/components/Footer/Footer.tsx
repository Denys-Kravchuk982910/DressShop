import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import './stlyes/footer.scss';

export const Footer = () => {
    return (<footer className='footer'>
        <div className="footer__container">
            <div className="footer__logo-block">
                <div className="footer__logo">LOGO IMAGE</div>
            </div>

            <div className="footer__socials">
                <a href="/" className="footer__social footer__social--instagram">
                    <FontAwesomeIcon icon={faInstagramSquare} className='footer__social-icon footer__social-icon--instagram' />
                </a>

                <a href="/" className="footer__social footer__social--facebook">
                    <FontAwesomeIcon icon={faFacebook} className='footer__social-icon' />
                </a>
            </div>

            <div className="footer__schedule">
                <p className='footer__schedule-title'>
                    Графік роботи
                    <br />
                    ПН-ПТ 8:00-20:00
                </p>
            </div>
        </div>
    </footer>);
}