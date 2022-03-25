import { useUserData, useUserEmail } from "atoms";
import { modifyUser, signUpUser } from "lib/api";
import React from "react";
import { useNavigate } from "react-router";
import { MainButton } from "ui/buttons";
import { MyText } from "ui/text";
import { MyTextInput } from "ui/text-field";
import css from "./index.css";

//da de alta al user nuevo o modifica los datos de un user existente
export function UserData(props) {
  const userData = useUserData();
  const token = localStorage.getItem("auth_token");
  const [email, setemail] = useUserEmail();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    let updateUser = {};
    let flag = true;

    const password = target.password.value;
    const confirmedPassword = target.confirmedPassword.value;
    const name = target.userName.value;

    //chequeo que no hayan campos vacios
    if (password === "" || name === "") {
      alert("los campos son obligatorios");
      flag = false;
    } else {
      //agrego el name
      updateUser = { ...updateUser, name };
      //chequeo que las contraseñas coincidan
      if (password === confirmedPassword) {
        //agrego el password
        updateUser = { ...updateUser, password };
      } else {
        alert("las contraseñas no coinciden");
        flag = false;
      }
    }
    //si flag es true, tenemos toda la info para llamar a la api
    if (flag) {
      //en caso de que exista un token debemos modificar un user
      if (token) {
        const res = await modifyUser({ body: updateUser, token });
        //una vez modificado el user lo redirijo a la home
        res ? navigate("/") : alert("ups algo salio mal");
      } else {
        //si no existe un token debemos darle de alta al user
        const res = await signUpUser({ name, email, password });
        //una vez dado de alta redirijo al login
        res ? navigate("/login") : alert("ups algo salio mal");
      }
    }
  }

  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Mis datos</MyText>
      </div>
      <form action="" className={css.form} onSubmit={handleSubmit}>
        <MyTextInput
          value={userData?.name}
          label="NOMBRE"
          name="userName"
          type="text"
        ></MyTextInput>
        <MyTextInput
          label="CONTRASEÑA"
          name="password"
          type="password"
        ></MyTextInput>
        <MyTextInput
          label="REPETIR CONTRASEÑA"
          name="confirmedPassword"
          type="password"
        ></MyTextInput>
        <MainButton>Guardar</MainButton>
      </form>
    </div>
  );
}
