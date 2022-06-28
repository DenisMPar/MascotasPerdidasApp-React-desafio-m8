import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import css from "./layout.css";
import img from "images/logo.svg";
import { MainButton } from "ui/buttons";
import { MainMenu } from "components/menu";

export function Layout() {
  //flag que sirve para mostrar u ocultar el menu
  const [menuFlag, setMenuFlag] = useState(false);

  function handleClick() {
    setMenuFlag(true);
  }
  function setFlag() {
    setMenuFlag(false);
  }

  return (
    <div className={css.root}>
      <header className={css.header}>
        <Link to="/">
          <div className={css.containerLogo}>
            <img src={img} className={css.logo}></img>
          </div>
        </Link>
        <div className={css.containerMenuButton}>
          <MainButton onClick={handleClick}>Menu</MainButton>
        </div>
      </header>
      <MainMenu flag={menuFlag} onClick={setFlag}></MainMenu>
      <Outlet />
    </div>
  );
}
