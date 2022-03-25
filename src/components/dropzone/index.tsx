import React, { useEffect } from "react";
import { MainButton } from "ui/buttons";
import css from "./index.css";
import Dropzone from "dropzone";
import { useRecoilState } from "recoil";
import { pictureUrlState } from "atoms";

export function DropZone(props) {
  const [picture, setPicture] = useRecoilState(pictureUrlState);

  //hook que configura el dropzone una vez montado el componente
  useEffect(() => {
    const dropEl = document.querySelector(".foto-input");
    const previewContainer = document.querySelector(".dropzone-previews");
    const myDropzone = new Dropzone(dropEl, {
      url: "/falsa",
      autoProcessQueue: false,
      addRemoveLinks: true,
      createImageThumbnails: true,
      thumbnailMethod: "contain",
      previewsContainer: previewContainer,
      thumbnailHeight: 100,
      autoDiscover: false,
    });

    //obtengo la url de la imagen
    myDropzone.on("thumbnail", function (file) {
      setPicture(file.dataURL);
    });
    //en caso de eliminar la imagen borro la url
    myDropzone.on("removedfile", function (file) {
      setPicture("");
    });
  }, []);

  return (
    <div className={css.root}>
      <div className={css.containerImg + " dropzone-previews"}>
        {props.imgUrl ? (
          <img className={css.img} src={props.imgUrl || ""}></img>
        ) : null}
      </div>
      <MainButton className="foto-input" type="button">
        Agregar/Modificar foto
      </MainButton>
    </div>
  );
}
