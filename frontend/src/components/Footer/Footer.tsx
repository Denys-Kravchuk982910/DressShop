import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import './stlyes/footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (<footer className='footer'>
        <div className="footer__container">
            <div className="footer__logo-block">
                <div className="footer__logo"></div>
            </div>

            <div className="footer__socials">
                <Link
                    to="https://www.instagram.com/felitsiiabrand"
                    className="footer__social footer__social--instagram"
                    target='_blank'
                >
                    <FontAwesomeIcon icon={faInstagramSquare} className='footer__social-icon footer__social-icon--instagram' />
                </Link>

                <Link to="/" className="footer__social footer__social--facebook">
                    <FontAwesomeIcon icon={faFacebook} className='footer__social-icon' />
                </Link>
            </div>

            <div className="footer__schedule">
                <p className='footer__schedule-title'>
                    Графік роботи
                    <br />
                    ПН-ПТ 10:00-21:00
                </p>
            </div>
        </div>
    </footer>);
}