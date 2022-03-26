import React from "react";
import img from "images/closeButton.svg";
import css from "./index.css";
import { MainButton } from "ui/buttons";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuRedirectState, UserState } from "atoms";

export function MainMenu(props) {
  const token = localStorage.getItem("auth_token");
  const [userData, setUserData] = useRecoilState(UserState);
  let navigate = useNavigate();
  const [menuRedirect, setMenuRedirect] = useRecoilState(menuRedirectState);

  //funcion que checkea si el user tiene session abierta
  function handleClick(params) {
    //si es verdaderio lo redirije a la pagina que clickeo en el menu
    if (token) {
      navigate(params);
      props.onClick();
    } else {
      //si es falso lo manda al login y guarda el redirect
      // para enviarlo a la pagina deseada luego del login
      setMenuRedirect(params);
      navigate("/login");
      props.onClick();
    }
  }
  //funcion que cierra la sesión
  function handleCloseSession() {
    localStorage.removeItem("auth_token");
    setUserData({
      location: userData.location,
    });
    navigate("/");
  }
  return (
    <div className={css.root}>
      <div
        className={css.containerCloseButton}
        onClick={() => {
          props.onClick();
        }}
      >
        <img src={img} />
      </div>
      <div className={css.containerButtons}>
        <MainButton callbackParams={"/user/data"} onClick={handleClick}>
          Mis datos
        </MainButton>
        <MainButton callbackParams={"/user/pets"} onClick={handleClick}>
          Mis mascotas perdidas
        </MainButton>
        <MainButton callbackParams={"/user/pets/publish"} onClick={handleClick}>
          Reportar mascota
        </MainButton>
      </div>
      <div className={css.containerLogin}>
        {
          //si exite un token, muestro el button cerrar sesion
          token ? (
            <div className={css.containerCloseSession}>
              <h5 className={css.userEmail}>{userData?.email}</h5>
              <MainButton onClick={handleCloseSession} color="cancel">
                Cerrar Sesión
              </MainButton>
            </div>
          ) : (
            //si no existe muestro el button login
            <Link to="/login">
              <MainButton
                onClick={() => {
                  props.onClick();
                }}
                color="accept"
              >
                Log in
              </MainButton>
            </Link>
          )
        }
      </div>
    </div>
  );
}
