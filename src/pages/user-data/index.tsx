import { UserDataForm } from "components/userDataForm";
import React from "react";
import { MyText } from "ui/text";
import css from "./index.css";

//da de alta al user nuevo o modifica los datos de un user existente
export function UserData() {
  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Mis datos</MyText>
      </div>
      <div className={css.containerForm}>
        <UserDataForm></UserDataForm>
      </div>
    </div>
  );
}
