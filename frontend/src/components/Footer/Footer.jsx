import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>
            Тут могла бути якась корисна інформація.
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
            quaerat doloremque eos et sint deleniti iure, accusantium fugiat
            fuga voluptatem harum corporis.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Підприємство</h2>
          <ul>
            <li>Головна</li>
            <li>Про нас</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Контакти</h2>
          <ul>
            <li>+380 66 123 45 67</li>
            <li>random@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Library.com - All Right Reserve.
      </p>
    </div>
  );
};

export default Footer;
