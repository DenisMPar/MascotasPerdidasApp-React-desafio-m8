import React from "react";
import { useUserEmail } from "atoms";
import { checkEmail } from "lib/api";
import { useNavigate } from "react-router-dom";
import { MyTextInput } from "ui/text-field";
import { MainButton } from "ui/buttons";
import css from "./index.css";

function LoginComp() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useUserEmail();

  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    // uso un atomo para recuperarlo en la siguiente pantalla
    setUserEmail(email);
    const response = await checkEmail(email);

    if (response.user) {
      navigate("/login/password");
    } else {
      navigate("/user/data");
    }
  }

  return (
    <form className={css.form} onSubmit={submitHandler}>
      <MyTextInput label="EMAIL" name="email" type="text"></MyTextInput>
      <MainButton>Siguiente</MainButton>
    </form>
  );
}

export { LoginComp };
