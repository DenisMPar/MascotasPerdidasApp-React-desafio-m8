import { useGetPetsAround, UserState } from "atoms";
import { PetsCard } from "components/petsCard";
import { ReportCard } from "components/reportCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { MainButton } from "ui/buttons";
import { MyText } from "ui/text";
import css from "./index.css";

function Home() {
  const [coordinates, setCoordinates] = useState(null);
  const [userData, setUserData] = useRecoilState(UserState);
  const pets = useRecoilValue(useGetPetsAround);

  //triger es un flag para ocultar o mostrar la report card
  const [reportTrigger, setRepportTrigger] = useState(false);

  //guarda las coordenadas del user en el atomo "userState"
  //cada vez que cambie el state del comp
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
  //si tengo las coords del user muestro las mascotas cercanas
  if (userData.location) {
    return (
      <div className={css.root}>
        <MyText type="title">Mascotas perdidas cerca tuyo</MyText>
        {pets ? (
          pets.map((pet) => {
            return (
              <PetsCard
                petData={pet}
                key={pet.id}
                owner={false}
                setTrigger={setRepportTrigger}
              ></PetsCard>
            );
          })
        ) : (
          <div>No hay mascotas cerca</div>
        )}
        <ReportCard
          trigger={reportTrigger}
          setTrigger={setRepportTrigger}
        ></ReportCard>
      </div>
    );
  } else {
    //si no hay coords del user, muestro los componenetes que piden las coords
    return (
      <div className={css.root}>
        <MyText type="title">Mascotas perdidas cerca tuyo</MyText>

        <div className={css.containerSubtitle}>
          <MyText type="text">
            Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
            conocer tu ubicación.
          </MyText>
        </div>
        <MainButton onClick={getCoordinates}>Dar mi ubicación</MainButton>
      </div>
    );
  }
}
export { Home };
