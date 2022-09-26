import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import '../css/footer.css'
import Logo from "./Logo";

export default function Footer(){
    return <footer className='footer'>

        <Logo />
            
        <p className="footer-text">Copyright &copy; true-farm. All rights reserved</p>

        <div className='footer-icons'>
            <p className="footer-text">Follow us on our social media</p>
            <section className="footer-icons-wrap">
                <FaFacebook />
                <FaTwitter />
                <RiInstagramFill />
                <MdEmail />
                <BsYoutube />
            </section>
        </div>
    </footer>
}