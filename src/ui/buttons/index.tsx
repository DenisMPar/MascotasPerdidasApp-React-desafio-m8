import React, { useState } from "react";
import css from "./index.css";

type buttonProps = {
  type?: "button" | "submit" | "reset";
  color?: "accept" | "cancel";
  children?: any;
  onClick?: any;
  className?: string;
  callbackParams?: any;
};

const colors = {
  accept: "#7642D4",
  cancel: "#C7301F",
  p: "#ca5042",
};
export function MainButton(props: buttonProps) {
  const [buttonColor, setButtonColor] = useState(
    colors[props.color] || "#485FC7"
  );
  function onHover() {
    console.log("hover");

    if (props.color == "accept") {
      return "#8466bb";
    }
    if (props.color == "cancel") {
      return "#ca5042";
    } else {
      return "#6f81ce";
    }
  }

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
        onMouseEnter={() => setButtonColor(onHover())}
        onMouseLeave={() => setButtonColor(colors[props.color] || "#485FC7")}
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
        onMouseEnter={() => setButtonColor(onHover())}
        onMouseLeave={() => setButtonColor(colors[props.color] || "#485FC7")}
      >
        {props.children}
      </button>
    );
  }
}
