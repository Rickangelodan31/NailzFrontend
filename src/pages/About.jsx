import { useState, useEffect } from "react";
import Ricky from "../images/Ricky.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./about.css";
import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const AboutPage = () => {
  return (
    <div>
      <h1>About Us</h1>
      <div className="nav-abt">
        <div className="Ric-abt">
          <img src={Ricky} alt="Ricky" />
          <h1>Ricardo Watson</h1>
          <h2>CEO</h2>
          <h3>Age: 32</h3>
          <p>
            I am Based in Frankfurt am main, Germany I am a <br />
            Fullstack developer and this is one of the web
            <br /> pages I have created
          </p>
          <p>Company was Founded in 2024</p>
          <div className="links">
            <a href="https://www.facebook.com/ricardo.watson.16">
              <FontAwesomeIcon icon={faFacebook} className="a" />
            </a>
            <a href="https://github.com/Rickangelodan31">
              <FontAwesomeIcon icon={faGithub} className="a" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
