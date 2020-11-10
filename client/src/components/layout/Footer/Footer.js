import React from "react";
import "./Footer.scss";
const Footer = (props) => (
   <div>
      <footer className="section-footer">
         <div className="footer-container">
            <div className="grid">
               <ul>
                  <li className="bold">NAVIGATE</li>
                  <li>
                     <a href="/">Home</a>
                  </li>
                  <li>
                     <a href="/">Products</a>
                  </li>
                  <li>
                     {" "}
                     <a href="/">Contact us</a>
                  </li>
                  <li>
                     <a href="/">Check Rate</a>
                  </li>
                  <li>
                     <a href="/login">Sign in</a>
                  </li>
                  <li>
                     {" "}
                     <a href="/signup">Sign up</a>
                  </li>
               </ul>
            </div>
            <div className="grid">
               <ul>
                  <li className="bold">SERVICES</li>
                  <li>
                     <a href="/">Delivery</a>
                  </li>
                  <li>
                     <a href="/">Check rate</a>
                  </li>
                  <li>
                     <a href="/">Rating</a>
                  </li>
               </ul>
               <ul className="u-margin-top-v-small">
                  <li className="bold">
                     <a href="/">PARTNERS</a>
                  </li>
                  <li>
                     <a href="/">Babin Store</a>
                  </li>
                  <li>
                     <a href="/">Prajapati Suppliers</a>
                  </li>
               </ul>
            </div>
            <div className="grid">
               <ul>
                  <li className="bold">OUR SUPPLIERS</li>
                  <li>Bhaptapur Dairy</li>
                  <li>Babin Dairy Pvt.</li>
               </ul>
            </div>
            <div className="grid">
               <ul>
                  <li className="bold">STAY CONNNECTED</li>
                  <li className="">Be the first to get exciting offers.</li>
                  <li>
                     <form action="" className="footer-form">
                        <input
                           className="footer-input"
                           type="email"
                           placeholder="Enter your Email"
                        />
                        <input className="footer-btn form-btn" type="button" value="Subscribe" />
                     </form>
                  </li>
                  <li className="u-margin-top-v-small">
                     <a
                        href="https://www.facebook.com/profile.php?id=100007125259498"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav__links ">
                        <svg className="footer-icon footer-icon--facebook">
                           <use xlinkHref="/icons/tabler-sprite.svgatabler-brand-facebook" />
                        </svg>
                     </a>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <a href="a" className="nav__links ">
                        <svg className="footer-icon footer-icon--google">
                           <use xlinkHref="/icons/tabler-sprite.svg#tabler-brand-google" />
                        </svg>
                     </a>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <a
                        href="https://twitter.com/kpsharmaoli?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav__links ">
                        <svg className="footer-icon footer-icon--twitter">
                           <use xlinkHref="/icons/tabler-sprite.svg#tabler-brand-twitter" />
                        </svg>
                     </a>
                  </li>
               </ul>
            </div>
            <div className="grid">
               <ul>
                  <li className="bold">CONTACT US</li>
                  <li className="contact-row">
                     <div>
                        <svg className="footer-icon footer-icon--twitter">
                           <use xlinkHref="/icons/tabler-sprite.svg#tabler-phone-call" />
                        </svg>
                     </div>
                     <div className="u-margin-left-small">
                        <div>+977 9860465326</div>
                        <div>01 6614243</div>
                     </div>
                  </li>
                  <li className="contact-row">
                     <div>
                        <svg className="footer-icon footer-icon--gmail">
                           <use xlinkHref="/icons/tabler-sprite.svg#tabler-send" />
                        </svg>
                     </div>
                     <div className="u-margin-left-small">
                        <div>datheputhe.dairy@gmail.com</div>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
         <div className="copyrights">
            <div className="copyrights-container">
               <div className="grid-1">
                  <div>Copyright &copy; 2020 Datheputhe Dairy. All right reserved.</div>
                  <div>
                     <li>
                        <a href="/">Privacy Policy</a>
                        <a href="/">Terms of Use</a>
                        <a href="/">Refund Policy</a>
                     </li>
                  </div>
               </div>

               <div className="grid-2">
                  <img src="/icons/nepal.svg" alt="Nepal Flag" className="footer-icon--flag" />
               </div>
            </div>
         </div>
      </footer>
   </div>
);

export default Footer;
