import { pictureUrlState } from "atoms";
import { DropZone } from "components/dropzone";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { MainButton } from "ui/buttons";
import { MapboxSearch } from "ui/map";
import "../../../index.css";
import { MyText } from "ui/text";
import { MyTextInput } from "ui/text-field";
import css from "./index.css";
import { usePublish } from "hooks/hooks";

export function Publish() {
  const [formData, setFormData] = useState(null);
  const pictureUrl = useRecoilValue(pictureUrlState);
  const navigate = useNavigate();
  const { publish } = usePublish();

  //hook que guarda la url de la imagen
  useEffect(() => {
    setFormData({ ...formData, pictureUrl });
  }, [pictureUrl]);

  async function submitHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const token = localStorage.getItem("auth_token");

    //toda la data de la mascota
    const allData = {
      name,
      lat: formData?.mapbox?.coords[1],
      lng: formData?.mapbox?.coords[0],
      pictureUrl: formData?.pictureUrl,
      zone: formData?.mapbox?.zone,
      condition: "lost",
    };
    //mapeo el objeto
    const mappedData = Object.keys(allData).map((key) => {
      return allData[key];
    });
    //checkeo que todas las keys tengan un valor
    const checked = mappedData.every((value) => value);

    //si es verdadero hago la llamada a la api para dar de alta la mascota
    if (checked) {
      const res = await publish({ body: allData, token });

      if (res) {
        alert("tu mascota ha sido publicada");
        navigate("/user/pets");
      } else {
        alert("ups algo salio mal");
      }
    } else {
      //si es falso envio la alerta
      alert("todos los campos son obligatiorios");
    }
  }
  //funcion que recibe la data del mapbox
  function handleMapboxChange(data) {
    setFormData({
      ...formData,
      mapbox: data,
    });
  }

  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Reportar mascota perdida</MyText>
      </div>
      <div className={css.containerForm}>
        <form action="" className={css.form} onSubmit={submitHandler}>
          <MyTextInput label="NOMBRE" type="text" name="name" />
          <DropZone></DropZone>
          <MapboxSearch
            type="publish"
            onChange={handleMapboxChange}
          ></MapboxSearch>
          <MainButton color="accept" className={css.button} type="submit">
            Reportar como perdido
          </MainButton>
          <MainButton color="cancel" className={css.button} type="button">
            Cancelar
          </MainButton>
        </form>
      </div>
    </div>
  );
}
