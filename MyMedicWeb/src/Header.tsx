import react from 'react';
import './Header.css';

function Header(){
    return (
        <header>
            <div className="logo">MyMedic</div>
            <nav>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}
export default Header;