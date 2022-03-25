import React from "react";
import css from "./index.css";
type props = {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (any) => any;
};
export function MyTextInput(props: props) {
  return (
    <div className={css.container}>
      <label>{props.label}</label>
      <input
        className={css.input}
        type={props.type}
        name={props.name}
        defaultValue={props.value}
      ></input>
    </div>
  );
}
