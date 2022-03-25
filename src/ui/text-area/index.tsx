import React from "react";
import css from "./index.css";
type props = {
  label: string;
  name: string;
};
export function MyTextArea(props: props) {
  return (
    <div className={css.container}>
      <label>{props.label}</label>
      <textarea className={css.input} name={props.name}></textarea>
    </div>
  );
}
