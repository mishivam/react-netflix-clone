import React, { useEffect, useState } from "react";
import "../css/NavBarComponent.css";

function NavBarComponent() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`NavBar ${show && "NavBar__black"}`}>
      <img
        className="NavBar__logo"
        alt="Netflix-Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
      />
    </div>
  );
}

export default NavBarComponent;
