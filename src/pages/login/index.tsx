import React from "react";
import { MyText } from "ui/text";
import { LoginComp } from "components/login";
import css from "./index.css";

export function Login() {
  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Ingresar</MyText>
      </div>
      <LoginComp></LoginComp>
    </div>
  );
}
