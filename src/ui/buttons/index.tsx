import React from "react";
import css from "./index.css";

type buttonProps = {
  type?: "button" | "submit" | "reset";
  color?: "accept" | "cancel";
  children?: any;
  onClick?: any;
  className?: string;
  callbackParams?: any;
};

export function MainButton(props: buttonProps) {
  const colors = {
    accept: "#7642D4",
    cancel: "#C7301F",
  };

  const buttonColor = colors[props.color] || "#485FC7";
  const className = css.root + " " + props.className;
  if (props.callbackParams) {
    return (
      <button
        type={props.type}
        onClick={
          props.onClick ? () => props.onClick(props.callbackParams) : () => null
        }
        className={className}
        style={{ backgroundColor: `${buttonColor}` }}
      >
        {props.children}
      </button>
    );
  } else {
    return (
      <button
        type={props.type}
        onClick={props.onClick ? () => props.onClick() : () => null}
        className={className}
        style={{ backgroundColor: `${buttonColor}` }}
      >
        {props.children}
      </button>
    );
  }
}
