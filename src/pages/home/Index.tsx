import { useGetPetsAround, UserState } from "atoms";
import { GetCoordinatesComp } from "components/getCoordinates";
import { ShowPetsCards } from "components/showPetsCards";
import React, { useEffect } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilState } from "recoil";
import { MyText } from "ui/text";
import css from "./index.css";

function Home() {
  const [userData, setUserData] = useRecoilState(UserState);

  //si tengo las coords del user muestro las mascotas cercanas
  if (userData.location) {
    return (
      <div className={css.root}>
        <div className={css.containerTitle}>
          <MyText type="title">Mascotas perdidas cerca tuyo</MyText>
        </div>
        <ShowPetsCards></ShowPetsCards>
      </div>
    );
  } else {
    //si no hay coords del user, muestro el componente que pide las coords
    return (
      <div className={css.root}>
        <div className={css.containerTitle}>
          <MyText type="title">Mascotas perdidas cerca tuyo</MyText>
        </div>
        <GetCoordinatesComp></GetCoordinatesComp>
      </div>
    );
  }
}
export { Home };
