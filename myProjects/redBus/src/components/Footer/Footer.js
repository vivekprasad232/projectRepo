import "./Footer.css";
import rfl from "../../images/rdc-redbus-logo.svg";
import fblogo from "../../images/fblogo.svg";
import instalogo from "../../images/instalogo.svg";
import twitterlogo from "../../images/twitterlogo.svg";
function Footer(){
    return(
    <footer>
        <div className="footer-row">
            <div className="footer-left">
                <img className="rflogo" src={rfl} alt="logo" />
                <div>
                redBus is the world's largest online bus ticket booking service trusted by over 25 million happy customers globally.
                 redBus offers bus ticket booking through its website,iOS and Android mobile apps for all major routes.
                </div>
                <div className="smicon">
                    <img className="smicons" src={fblogo} alt="fblogo"/>
                    <img className="smicons" src={instalogo} alt="instalogo"/>
                    <img className="smicons" src={twitterlogo} alt="twitterlogo"/>
                </div>
            </div>
            <div className="footer-right">
                <div className="right-sec">
                    <div className="right-sec-item">
                        <div className="fheading fdetails">About redBus</div>
                        <div className="fdetails">About Us</div>
                        <div className="fdetails">Contact Us</div>
                        <div className="fdetails">Mobile Version</div>
                    </div>
                    <div className="right-sec-item">
                        <div className="fheading fdetails">Info</div>
                        <div className="fdetails">T & C</div>
                        <div className="fdetails">Privacy Policy</div>
                        <div className="fdetails">Cookie Policy</div>
                        <div className="fdetails">FAQ</div>
                        <div className="fdetails">Blog</div>
                    </div>
                    <div className="right-sec-item">
                        <div className="fheading fdetails">Global Sites</div>
                        <div className="fdetails">India</div>
                        <div className="fdetails">Singapore</div>
                        <div className="fdetails">Malaysia</div>
                        <div className="fdetails">Indonesia</div>
                        <div className="fdetails">Peru</div>
                        <div className="fdetails">Colombia</div>
                    </div>
                    <div className="right-sec-item">
                        <div className="fheading fdetails">Our Partners</div>
                        <div className="fdetails">Goiboibo</div>
                        <div className="fdetails">Makemytrip</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bottom">2021 ibibogroup All rights reserved</div>
    </footer>
    );
}
export default Footer;