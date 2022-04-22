import { useGetPetsAround } from "atoms";
import { PetsCard } from "components/petsCard";
import { ReportCard } from "components/reportCard";
import React, { useEffect, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import css from "./index.css";

export function ShowPetsCards() {
  const pets = useRecoilValue(useGetPetsAround);
  const refresh = useRecoilRefresher_UNSTABLE(useGetPetsAround);

  //refresco el selector cuando se carga la pag para tener la data actualizada de las pets
  useEffect(() => {
    refresh();
  }, []);

  //triger es un flag para ocultar o mostrar la report card
  const [reportTrigger, setRepportTrigger] = useState(false);

  //si tengo las coords del user muestro las mascotas cercanas
  return (
    <div>
      <div className={css.containerCards}>
        {pets ? (
          pets.map((pet) => {
            if (pet.condition === "lost") {
              return (
                <PetsCard
                  petData={pet}
                  key={pet.id}
                  owner={false}
                  setTrigger={setRepportTrigger}
                ></PetsCard>
              );
            }
          })
        ) : (
          <div>No hay mascotas cerca</div>
        )}
      </div>
      <ReportCard
        trigger={reportTrigger}
        setTrigger={setRepportTrigger}
      ></ReportCard>
    </div>
  );
}
