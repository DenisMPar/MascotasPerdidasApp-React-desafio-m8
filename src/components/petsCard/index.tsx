import React from "react";
import img2 from "images/editButton.svg";
import css from "./index.css";
import { MyText } from "ui/text";
import { MainButton } from "ui/buttons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { petState } from "atoms";
import { useNavigate } from "react-router";

type cardProps = {
  children?: any;
  owner: boolean;
  petData: any;
  setTrigger?: (any) => any;
};
export function PetsCard(props: cardProps) {
  const petData = props.petData;
  const navigate = useNavigate();
  const [petAtom, setPetAtom] = useRecoilState(petState);
  //funcion que da display a la tarjeta de reporte de una mascota
  function handleClick() {
    props.setTrigger(true);
    //guardo la data de la mascota en el state para saber que mascota se va a reportar
    setPetAtom(petData);
  }
  //funcion que redirije a la pagina de editar mascota
  function handleEditClick() {
    //vuelvo a guardar en el state la data de la mascota que se va a editar
    setPetAtom(petData);
    navigate("/user/pets/edit");
  }

  return (
    <div className={css.root}>
      <div className={css.containerImage}>
        <img className={css.image} src={petData.pictureUrl} alt="" />
      </div>
      <div className={css.containerCardText}>
        <div className={css.containerCardTitles}>
          <MyText type="title" noMargin={true}>
            {petData.name}
          </MyText>
          <MyText type="text" noMargin={true}>
            {petData.zone}
          </MyText>
        </div>
        {props.owner ? (
          <div className={css.containerEditButton} onClick={handleEditClick}>
            <img src={img2} className={css.editButton} />
          </div>
        ) : (
          <div className={css.containerReportButton}>
            <MainButton color="cancel" onClick={handleClick}>
              reportar
            </MainButton>
          </div>
        )}
      </div>
    </div>
  );
}
