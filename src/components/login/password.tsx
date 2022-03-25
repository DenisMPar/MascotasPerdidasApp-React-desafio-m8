import React, { useState, useEffect } from "react";
import { useAuth } from "hooks/hooks";
import { useNavigate } from "react-router-dom";
import { menuRedirectState, UserState, useUserData, useUserEmail } from "atoms";
import { MyTextInput } from "ui/text-field";
import { MainButton } from "ui/buttons";
import css from "./index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { getMe } from "lib/api";

export function PasswordComp() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useUserEmail();
  const [userData, setUserData] = useRecoilState(UserState);
  const { login } = useAuth();
  const menuRedirect = useRecoilValue(menuRedirectState);

  async function submitHandler(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const authRes = await login(userEmail, password);

    if (authRes) {
      const token = localStorage.getItem("auth_token");
      const data = await getMe(token);
      setUserData({ ...userData, ...data });
      navigate(menuRedirect);
    } else {
      alert("contraseña incorrecta");
    }
  }

  return (
    <form className={css.form} onSubmit={submitHandler}>
      <MyTextInput
        label="CONTRASEÑA"
        name="password"
        type="password"
      ></MyTextInput>
      <MainButton>Ingresar</MainButton>
    </form>
  );
}
