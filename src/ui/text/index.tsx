import React from "react";
import css from "./index.css";
type props = {
  type?: "title" | "subtitle" | "text";
  bold?: boolean;
  noMargin?: boolean;
  children: any;
};
export function MyText(props: props) {
  const classNames = {
    title: css.title,
    subtitle: css.subtitle,
    text: css.text,
  };
  //inicio el nombre de la clase como un espacio en blanco para que no afecte al componente
  let bold = " ";
  //si existe la propiedad bold, le sumo la clase css correspondiente al estilo
  if (props.bold) {
    bold += css.bold;
  }
  let noMargin = " ";
  if (props.noMargin) {
    noMargin += css.noMargin;
  }
  //diccionario con los 3 estilos posibles de texto
  const textTypes = {
    title: (
      <h1 className={classNames.title + bold + noMargin}>{props.children}</h1>
    ),
    subtitle: (
      <h3 className={classNames.subtitle + bold + noMargin}>
        {props.children}
      </h3>
    ),
    text: <p className={classNames.text + bold + noMargin}>{props.children}</p>,
  };
  //devuelvo el estilo indicado por props, o por defecto un texto
  return textTypes[props.type] || textTypes.text;
}
