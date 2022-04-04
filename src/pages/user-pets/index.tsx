import React, { useEffect } from "react";
import { PetsCard } from "components/petsCard";
import { MyText } from "ui/text";
import { useGetUserPets } from "atoms";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import css from "./index.css";

function UserPets() {
  const pets = useRecoilValue(useGetUserPets);
  const refresh = useRecoilRefresher_UNSTABLE(useGetUserPets);

  //refresco el selector para tener la data actualizada de las pets
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={css.root}>
      <div className={css.containerTitle}>
        <MyText type="title">Tus mascotas reportadas</MyText>
      </div>
      <div className={css.containerCards}>
        {pets ? (
          pets.map((pet) => {
            return (
              <PetsCard key={pet.id} petData={pet} owner={true}></PetsCard>
            );
          })
        ) : (
          <MyText>No hay mascotas reportadas</MyText>
        )}
      </div>
    </div>
  );
}
export { UserPets };
