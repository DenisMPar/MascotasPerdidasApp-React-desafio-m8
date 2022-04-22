import { UserState } from "atoms";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { MainButton } from "ui/buttons";
import { MyText } from "ui/text";
import css from "./index.css";

export function GetCoordinatesComp() {
  const [coordinates, setCoordinates] = useState(null);
  const [userData, setUserData] = useRecoilState(UserState);

  //guarda las coordenadas del user en el atomo "userState"
  useEffect(() => {
    if (coordinates) {
      setUserData({ ...userData, location: coordinates });
    }
  }, [coordinates]);

  function getCoordinates() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      const coordinates = {
        lat: crd.latitude,
        lng: crd.longitude,
      };
      //modifico las coordenadas en el state del comp
      setCoordinates(coordinates);
    }

    function error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <div className={css.containerAskCoords}>
      <MyText type="text">
        Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
        conocer tu ubicación.
      </MyText>
      <div className={css.containerUbicationButton}>
        <MainButton onClick={getCoordinates}>Dar mi ubicación</MainButton>
      </div>
    </div>
  );
}
